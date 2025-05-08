import { NextApiRequest, NextApiResponse } from 'next';
import { SpotifyAuthError } from '../../errors';
import { TOKEN_COOKIE_KEY } from '../constants';
import { getCookie } from 'cookies-next';

export async function getSpotifyAccessToken(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const cookieValue = await getCookie(TOKEN_COOKIE_KEY, { req, res });
	if (!cookieValue) {
		throw new SpotifyAuthError('Authentication token missing. Please log in.');
	}
	return cookieValue;
}
