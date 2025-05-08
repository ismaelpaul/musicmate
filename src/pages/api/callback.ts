import { exchangeToken } from '@/lib/spotify/auth/exchangeToken';
import { setAuthCookies } from '@/lib/spotify/auth/setAuthCookies';
import { validateState } from '@/lib/spotify/auth/validateState';
import { SpotifyTokenExchangeError } from '@/lib/spotify/errors';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const code = req.query.code as string | undefined;

	if (!validateState(req, res)) {
		res.redirect('/login?error=state_mismatch');
		return;
	}

	if (!code) {
		console.error('Authorization code missing.');
		res.redirect('/login?error=missing_code');
		return;
	}

	try {
		const tokenData = await exchangeToken(code);

		if (!tokenData) {
			throw new Error('No token data received.');
		}

		setAuthCookies(req, res, tokenData);

		res.redirect('/');
	} catch (error) {
		const errMessage =
			error instanceof Error
				? error.message
				: 'Failed trying to exchange token';
		if (!(error instanceof SpotifyTokenExchangeError)) {
			throw new SpotifyTokenExchangeError(errMessage);
		}

		res.redirect(
			`/login?error=token_exchange_failed&details=${encodeURIComponent(
				error.message
			)}`
		);
	}
}
