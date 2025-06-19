import { getAuthOptions } from '@/lib/auth/authOptions';
import { fetchRecommendationsFromReccoBeats } from '@/lib/reccobeats/service/reccobeatsService';
import { extractSpotifyIdsFromReccoBeats } from '@/lib/reccobeats/utils/extractSpotifyIdsFromReccobeatsRecommendations';
import { getArtistFromSpotify } from '@/lib/spotify/api/getArtistFromSpotify';

import { getTopTracksIdsForArtists } from '@/lib/spotify/api/getTopTracksIdsForArtists';

import { SpotifyAuthError } from '@/lib/spotify/errors';
import { getSpotifyTracksByIds } from '@/lib/spotify/service/spotifyTracksByIdService';

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export async function attributeRecommendationHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let token: string;

	const attributes = req.body.attributes;
	const recommendationLimit = req.body.recommendationLimit;

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

	const { artist: artistName } = req.body;

	// get artist ID from Spotify
	const artistId = await getArtistFromSpotify(artistName, token);

	// get top tracks for the artist
	const topTracks = await getTopTracksIdsForArtists(artistId, token, {
		limit: 5,
	});

	if (!topTracks || topTracks.length === 0) {
		throw new Error(`No top tracks found for artist: ${artistName}`);
	}

	// get recommendations from reccobeats
	const reccobeatsRecommendations = await fetchRecommendationsFromReccoBeats(
		topTracks,
		attributes,
		recommendationLimit
	);

	const spotifyIdsToFetch = extractSpotifyIdsFromReccoBeats(
		reccobeatsRecommendations.content
	);

	// get spotify tracks by id
	const spotifyTracks = await getSpotifyTracksByIds(spotifyIdsToFetch, token);

	return spotifyTracks;
}
