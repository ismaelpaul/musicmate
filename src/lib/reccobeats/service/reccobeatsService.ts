import { ReccobeatsResponse } from '../types';
import { BaseError } from '@/lib/errors';
import { buildReccobeatsUrl } from '../utils/buildReccobeatsUrl';
import { handleErrorResponse } from '../utils/handleErrors';
import { parseJson } from '../utils/parseJson';
import { ReccoBeatsInvalidRequestError } from '../errors';

export const fetchRecommendationsFromReccoBeats = async (
	artistIds: string[],
	attributes: Record<string, string | number>,
	recommendationLimit: number
): Promise<ReccobeatsResponse> => {
	const url = buildReccobeatsUrl(artistIds, attributes, recommendationLimit);

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { Accept: 'application/json' },
		});

		if (!response.ok) {
			return await handleErrorResponse(response);
		}

		return await parseJson(response);
	} catch (error) {
		if (error instanceof BaseError) {
			throw error;
		}

		console.error('Unexpected error fetching from ReccoBeats:', error);
		throw new ReccoBeatsInvalidRequestError(
			'Unexpected error fetching ReccoBeats data'
		);
	}
};
