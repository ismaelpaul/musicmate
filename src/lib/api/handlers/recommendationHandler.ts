import { recommendationRequestSchema } from '@/lib/llm/schema';
import { getSpotifyParamsFromLlm } from '@/lib/llm/service/llmService';
import { fetchRecommendationsFromReccoBeats } from '@/lib/reccobeats/service/reccobeatsService';
import { extractSpotifyIdsFromReccoBeats } from '@/lib/reccobeats/utils/extractSpotifyIdsFromReccobeatsRecommendations';
import { TOKEN_COOKIE_KEY } from '@/lib/spotify/constants';
import { SpotifyAuthError } from '@/lib/spotify/errors';
import { searchSpotifyTracks } from '@/lib/spotify/service/spotifySearchService';
import { getSpotifyTracksByIds } from '@/lib/spotify/service/spotifyTracksByIdService';
import { getCookie } from 'cookies-next';

export async function recommendationHandler(req: any, res: any) {
	let spotifyAccessToken: string;

	// validate user token
	const cookieValue = await getCookie(TOKEN_COOKIE_KEY, { req, res });
	if (typeof cookieValue === 'string' && cookieValue.length > 0) {
		spotifyAccessToken = cookieValue;
	} else {
		throw new SpotifyAuthError('Authentication token missing. Please log in.');
	}

	// validate request body
	if (!req.body || typeof req.body !== 'object') {
		throw new Error('Invalid request: Missing or malformed body.');
	}

	const validatedBody = recommendationRequestSchema.parse(req.body);
	const { userQuery } = validatedBody;

	// get Spotify parameters from LLM
	const llmParams = await getSpotifyParamsFromLlm(userQuery);

	// search for tracks in Spotify based on LLM params
	const seedTrackInfoArray = await searchSpotifyTracks(
		llmParams.seed_artists || [],
		llmParams.seed_genres || [],
		spotifyAccessToken
	);

	if (seedTrackInfoArray.length === 0) {
		return [];
	}

	const actualSeedTrackIds = seedTrackInfoArray.map(
		(trackInfo) => trackInfo.id
	);

	// fetch ReccoBeats recommendations
	const reccoBeatsTracks = await fetchRecommendationsFromReccoBeats(
		llmParams,
		actualSeedTrackIds
	);

	// extract Spotify track IDs from ReccoBeats results
	const spotifyIdsToFetch = extractSpotifyIdsFromReccoBeats(reccoBeatsTracks);

	if (spotifyIdsToFetch.length === 0) {
		return [];
	}

	// Fetch full track details from Spotify
	const spotifyTracks = await getSpotifyTracksByIds(
		spotifyIdsToFetch,
		spotifyAccessToken
	);

	return spotifyTracks;
}
