import { log } from 'console';

export async function getArtistFromSpotify(
	artistName: string,
	token: string
): Promise<string> {
	const endpoint = `https://api.spotify.com/v1/search`;

	const params = new URLSearchParams({
		q: `"${artistName}"`,
		type: 'artist',
		limit: '1',
	});

	const response = await fetch(`${endpoint}?${params.toString()}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error(
			`Failed to fetch artist from Spotify. Status: ${response.status}`
		);
	}

	const data = await response.json();

	const artist = data.artists?.items;
	log(`Artist search result for "${artistName}":`, artist);

	if (!artist) {
		throw new Error(`Artist '${artistName}' not found on Spotify.`);
	}

	return artist[0].id;
}
