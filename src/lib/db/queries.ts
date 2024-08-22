import { isUniqueConstraintError } from './errors';
import { DbError, DbErrorType, type User } from './types';
import { v4 as uuidv4 } from 'uuid';

type Platform = Readonly<App.Platform> | undefined;
const getDbThrowIfMissing = (platform: Platform) => {
	const db = platform?.env?.DB;
	if (!db) {
		throw new DbError(DbErrorType.MISSING, 'DB binding is missing');
	}
	return db;
};

export const getUser = async (platform: Platform, uuid: string) => {
	const db = getDbThrowIfMissing(platform);
	const user = await db.prepare('select * from Users where uuid=?1').bind(uuid).first<User>();
	return user;
};

export const createUser = async (
	platform: Platform,
	userCreateArgs: { username: string; bcrypt: string; role: number }
) => {
	const db = getDbThrowIfMissing(platform);
	const newUser = {
		username: userCreateArgs.username,
		bcrypt: userCreateArgs.bcrypt,
		role: userCreateArgs.role,
		createdOn: Date.now(),
		updatedOn: Date.now(),
		uuid: uuidv4()
	};
	try {
		const result = await db
			.prepare(
				'insert into Users (username, bcrypt, role, createdOn, updatedOn, uuid) values (?1, ?2, ?3, ?4, ?5, ?6)'
			)
			.bind(...Object.values(newUser))
			.run<User>();

		if (!result.success) {
			throw new DbError(DbErrorType.MISC, '');
		}
		return newUser.uuid;
	} catch (e: any) {
		if (isUniqueConstraintError(e)) {
			throw new DbError(DbErrorType.DUPLICATE, 'Username already exists');
		}
		throw new DbError(DbErrorType.MISC, '');
	}
};
