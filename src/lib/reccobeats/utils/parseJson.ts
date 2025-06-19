import { ReccoBeatsApiError } from '../errors';
import { ReccobeatsResponse } from '../types';

export const parseJson = async (
	response: Response
): Promise<ReccobeatsResponse> => {
	try {
		const text = await response.text();
		if (!text)
			throw new ReccoBeatsApiError('Empty response body', response.status);
		return JSON.parse(text);
	} catch (error: unknown) {
		let errorMessage = 'Failed to parse JSON response';
		if (error instanceof SyntaxError) {
			errorMessage += ': Invalid JSON format';
		}
		throw new ReccoBeatsApiError(errorMessage, response.status);
	}
};
