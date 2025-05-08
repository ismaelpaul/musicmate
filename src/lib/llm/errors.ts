import { BaseError } from '../errors';

export class LLMError extends BaseError {
	constructor(
		message = 'LLM service unavailable or encountered an error',
		statusCode = 503
	) {
		super(message, statusCode);
	}
}

export class LLMOutputFormatError extends LLMError {
	constructor(
		message = 'LLM failed to produce valid parameters or expected format'
	) {
		super(message, 500);
	}
}
