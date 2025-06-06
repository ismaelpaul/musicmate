import { LLMSpotifyParams, llmSpotifyParamsSchema } from '../schema';
import { generatePrompt } from '../utils/generatePrompt';
import { config } from '../../config';
import { LLMError, LLMOutputFormatError } from '../errors';

export async function getSpotifyParamsFromLlm(
	userQuery: string
): Promise<LLMSpotifyParams> {
	if (!config.llmApiKey || !config.llmApiUrl) {
		throw new LLMError('LLM service is not configured.');
	}

	// generates prompt based on the user query
	const prompt = generatePrompt(userQuery);

	// builds header
	const headers = {
		Authorization: `Bearer ${config.llmApiKey}`,
		'Content-Type': 'application/json',
	};

	//builds json to be sent to the llm
	const body = JSON.stringify({
		model: config.llmModel,
		messages: [{ role: 'user', content: prompt }],
		temperature: config.llmTemperature,
		...(config.llmSupportsJsonMode && {
			response_format: { type: 'json_object' },
		}),
	});

	try {
		const response = await fetch(config.llmApiUrl, {
			method: 'POST',
			headers,
			body,
		});

		if (!response.ok) {
			// handles HTTP errors from LLM API
			const errorBody = await response.text();
			console.error(`LLM API Error: ${response.status} - ${errorBody}`);
			throw new LLMError(
				`LLM API request failed with status ${response.status}`,
				response.status
			);
		}
		const data = await response.json();

		// extracts JSON string
		const jsonString = data?.choices?.[0]?.message?.content ?? '';
		if (!jsonString && !config.llmSupportsJsonMode) {
			throw new LLMOutputFormatError('LLM returned empty content.');
		}

		// parses and validates using Zod ---
		const parsedJson = JSON.parse(jsonString);
		const validationResult = llmSpotifyParamsSchema.safeParse(parsedJson);

		if (!validationResult.success) {
			throw new LLMOutputFormatError(
				`LLM JSON failed schema validation: ${validationResult.error.message}`
			);
		}

		return validationResult.data;
	} catch (error) {
		if (error instanceof SyntaxError) {
			throw new LLMOutputFormatError('LLM output was not valid JSON.');
		}
		throw new LLMError('An unexpected error occurred during LLM processing.');
	}
}
