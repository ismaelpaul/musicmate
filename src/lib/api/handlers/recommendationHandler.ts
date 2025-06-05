import { getAuthOptions } from '@/lib/auth/authOptions';
import { recommendationRequestSchema } from '@/lib/llm/schema';
import { getSpotifyParamsFromLlm } from '@/lib/llm/service/llmService';
import { getTopTracksIdsForArtists } from '@/lib/spotify/api/getTopTracksIdsForArtists';
import { SpotifyAuthError } from '@/lib/spotify/errors';
import { searchSpotifyArtists } from '@/lib/spotify/service/searchSpotifyArtists';

import { getSpotifyTracksByIds } from '@/lib/spotify/service/spotifyTracksByIdService';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export async function recommendationHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let token: string;

	const session = await getServerSession(req, res, getAuthOptions());

	if (session && typeof session.accessToken === 'string') {
		token = session.accessToken;
	} else {
		throw new SpotifyAuthError('Session token is missing.. Please log in.');
	}

	// validate request body
	if (!req.body || typeof req.body !== 'object') {
		throw new Error('Invalid request: Missing or malformed body.');
	}

	const validatedBody = recommendationRequestSchema.parse(req.body);
	const { userQuery, recommendationLimit } = validatedBody;

	// get spotify parameters from llm
	const llmParams = await getSpotifyParamsFromLlm(userQuery);
	console.log('LLM Parameters:', llmParams);

	// search for tracks in spotify based on llm params
	const artists = await searchSpotifyArtists(
		llmParams.seed_artists || [],
		llmParams.seed_genres || [],
		token,
		recommendationLimit
	);

	if (artists.length === 0) {
		return [];
	}

	const artistsIdsArray = artists.map((artist) => artist.id);

	// fetch full track details from spotify to be used in the spotify player sdk
	const artistsTopTracks = await getTopTracksIdsForArtists(
		artistsIdsArray,
		token
	);

	const spotifyTracks = await getSpotifyTracksByIds(artistsTopTracks, token);

	return spotifyTracks;
}
