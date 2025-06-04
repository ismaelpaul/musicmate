export class BaseError extends Error {
	public readonly statusCode: number;

	constructor(message: string, statusCode: number = 500) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
