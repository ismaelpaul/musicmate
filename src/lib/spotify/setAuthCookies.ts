import { setCookie } from 'cookies-next';
import { TOKEN_COOKIE_KEY } from './constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { SpotifyTokenResponse } from './types';

export function setAuthCookies(
	req: NextApiRequest,
	res: NextApiResponse,
	tokenData: SpotifyTokenResponse
) {
	setCookie(TOKEN_COOKIE_KEY, tokenData.access_token, {
		req,
		res,
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		maxAge: tokenData.expires_in,
		path: '/',
		sameSite: 'lax',
	});

	// TODO: Store refresh token in DB
}
