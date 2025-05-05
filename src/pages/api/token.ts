import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = await getCookie('spotify_access_token', { req, res });

	if (!token) {
		return res.status(401).json({ error: 'No token found' });
	}

	res.status(200).json({ token });
}
