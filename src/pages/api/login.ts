import { randomBytes } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import {
	REDIRECT_URI,
	SCOPE,
	SPOTIFY_CLIENT_ID,
	STATE_KEY,
} from '@/lib/spotify/constants';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const state = randomBytes(16).toString('hex');

	setCookie(STATE_KEY, state, {
		req,
		res,
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		maxAge: 60 * 10,
		path: '/',
		sameSite: 'lax',
	});

	const params = new URLSearchParams({
		response_type: 'code',
		client_id: SPOTIFY_CLIENT_ID,
		scope: SCOPE,
		redirect_uri: REDIRECT_URI,
		state,
	});

	const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

	res.redirect(spotifyAuthUrl);
}
