import { BaseError } from '../errors';

export class ReccoBeatsApiError extends BaseError {
	constructor(
		message = 'ReccoBeats API error',
		statusCode = 500,
		public details?: string
	) {
		super(message, statusCode);
	}
}

export class ReccoBeatsAuthError extends ReccoBeatsApiError {
	constructor(message = 'ReccoBeats authentication failed') {
		super(message, 401);
	}
}

export class ReccoBeatsInvalidRequestError extends ReccoBeatsApiError {
	constructor(message = 'Invalid parameters in ReccoBeats request') {
		super(message, 400);
	}
}

export class ReccoBeatsParseError extends ReccoBeatsApiError {
	constructor(message = 'Unable to parse ReccoBeats response') {
		super(message, 502);
	}
}
