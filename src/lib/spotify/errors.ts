import { BaseError } from '../errors';

export class SpotifyApiError extends BaseError {
	constructor(message = 'External API error', statusCode = 500) {
		super(message, statusCode);
	}
}

export class SpotifyAuthError extends SpotifyApiError {
	constructor(message = 'Authentication failed') {
		super(message, 401);
	}
}

export class SpotifyInvalidRequestError extends SpotifyApiError {
	constructor(message = 'Invalid request parameters for external API') {
		super(message, 400);
	}
}

export class SpotifyTokenExchangeError extends SpotifyApiError {
	constructor(message = 'Failed to exchange authorization code for token') {
		super(message, 502);
	}
}
