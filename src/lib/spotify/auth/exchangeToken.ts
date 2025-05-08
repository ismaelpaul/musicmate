import {
	REDIRECT_URI,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
} from '../constants';
import { SpotifyTokenResponse } from '../types';

export function exchangeToken(code: string): Promise<SpotifyTokenResponse> {
	const basicAuth = Buffer.from(
		`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
	).toString('base64');

	const body = new URLSearchParams({
		code,
		redirect_uri: REDIRECT_URI,
		grant_type: 'authorization_code',
	}).toString();

	return fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basicAuth}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body,
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Error exchanging token: ${res.status}`);
			}
			return res.json();
		})
		.catch((error) => {
			console.error('Error exchanging token:', error);
			throw error;
		});
}
