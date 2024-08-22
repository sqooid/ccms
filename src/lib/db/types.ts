export enum DbErrorType {
	MISSING,
	MISC,
	DUPLICATE
}
export class DbError extends Error {
	type: DbErrorType;
	constructor(type: DbErrorType, msg: string) {
		super(msg);
		this.type = type;
	}
}

export type User = {
	id: number; // db use
	uuid: string; // url use
	username: string; // identification
	bcrypt: string;
	role: number;
	createdOn: number;
	updatedOn: number;
};
