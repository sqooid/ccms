type DbErrorType = 'noBinding' | 'duplicate' | 'misc';
export class DbError extends Error {
	type: DbErrorType;
	constructor(type: DbErrorType, msg: string) {
		super(msg);
		this.type = type;
	}
}
