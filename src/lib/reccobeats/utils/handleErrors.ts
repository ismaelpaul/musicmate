import { ReccoBeatsApiError } from '../errors';

export const handleErrorResponse = async (
	response: Response
): Promise<never> => {
	const text = await response.text();
	let errorMessage = `ReccoBeats API Error ${response.status}`;
	let details;

	try {
		const json = JSON.parse(text);
		errorMessage = json.message || errorMessage;
		details = json.details;
	} catch {
		errorMessage += ' (Invalid JSON in error body)';
	}

	throw new ReccoBeatsApiError(errorMessage, response.status, details);
};
