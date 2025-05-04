import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = await getCookie('spotify_access_token', { req, res });

	if (!token || typeof token !== 'string') {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const spotifyRes = await fetch('https://api.spotify.com/v1/me', {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!spotifyRes.ok) {
		return res
			.status(spotifyRes.status)
			.json({ error: 'Failed to fetch user' });
	}

	const data = await spotifyRes.json();

	res.status(200).json(data);
}
