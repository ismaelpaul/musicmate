import { setCookie } from 'cookies-next';

import { NextApiRequest, NextApiResponse } from 'next';
import { STATE_KEY } from '../constants';

export function validateState(
	req: NextApiRequest,
	res: NextApiResponse
): boolean {
	const state = req.query.state as string;
	const storedState = req.cookies[STATE_KEY];

	if (!state || state !== storedState) {
		console.error('State or stored state is undefined.');
		return false;
	}

	setCookie(STATE_KEY, '', { req, res, maxAge: -1, path: '/' });

	return true;
}
