import { RecommendationTrack } from '@/components/Spotify/types';
import { config } from '../../config';
import { SpotifyApiError, SpotifyAuthError } from '../errors';
import { validateAndLimitTrackIds } from '../utils/validateAndLimitTrackIds';

export const getSpotifyTracksByIds = async (
	trackIds: string[],
	token: string
): Promise<RecommendationTrack[]> => {
	if (!trackIds.length) return [];

	if (!token) {
		throw new SpotifyAuthError('Missing Spotify authentication token.');
	}

	const limitedTrackIds = validateAndLimitTrackIds(trackIds);

	const url = new URL(`${config.spotifyApiUrl}/tracks`);
	url.searchParams.set('ids', limitedTrackIds.join(','));
	url.searchParams.set('market', 'from_token');

	const response = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new SpotifyApiError('Spotify API request failed.', response.status);
	}

	const json = await response.json();
	const tracks = json.tracks || [];
	return tracks.filter(
		(track: RecommendationTrack) => track !== null
	) as RecommendationTrack[];
};
