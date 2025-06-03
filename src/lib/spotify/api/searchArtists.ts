import { config } from '../../config';
import { SpotifyApiError, SpotifyAuthError } from '../errors';
import { SpotifySearchArtistsResponse } from '../types';

export async function searchArtists(
	query: string,
	limit: number,
	token: string
): Promise<SpotifySearchArtistsResponse> {
	const baseUrl = `${config.spotifyApiUrl}${config.spotifySearchEndpoint}`;
	const params = new URLSearchParams({
		q: query,
		type: 'artist',
		limit: String(limit),
	});
	const url = `${baseUrl}?${params.toString()}`;
	console.log(`Executing Spotify Search URL: ${url}`);

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/json',
		},
	});

	const bodyText = await response.text();

	if (!response.ok) {
		let errorDetail = { message: `Spotify API Error ${response.status}` };
		try {
			const parsed = JSON.parse(bodyText);
			errorDetail = parsed.error || parsed || errorDetail;
		} catch {
			errorDetail.message = bodyText || errorDetail.message + ' (Empty Body)';
		}

		if (response.status === 401)
			throw new SpotifyAuthError(errorDetail.message);
		throw new SpotifyApiError(errorDetail.message, response.status);
	}

	try {
		return JSON.parse(bodyText);
	} catch {
		throw new SpotifyApiError(
			'Failed to parse Spotify response',
			response.status
		);
	}
}
