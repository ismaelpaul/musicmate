import { NextApiRequest, NextApiResponse } from 'next';

import { BaseError } from '@/lib/errors';

import { RecommendationTrack } from '@/components/Spotify/types';
import { attributeRecommendationHandler } from '@/lib/api/handlers/attributeRecommendationHandler';

type RecommendationsResponse =
	| { recommendations: RecommendationTrack[] }
	| { error: string };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<RecommendationsResponse>
) {
	if (req.method !== 'POST') {
		return res
			.setHeader('Allow', ['POST'])
			.status(405)
			.json({
				error: `Method ${req.method} Not Allowed`,
			});
	}

	try {
		const recommendations = await attributeRecommendationHandler(req, res);

		return res.status(200).json({ recommendations });
	} catch (error) {
		console.error('API Handler Error: ', error);
		if (error instanceof BaseError) {
			return res.status(error.statusCode).json({ error: error.message });
		}
		return res.status(500).json({ error: 'Internal server error.' });
	}
}
