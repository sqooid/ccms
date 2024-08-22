import { drizzle } from 'drizzle-orm/d1';
import { DbError } from './types';
import { users } from './schema';

type Platform = Readonly<App.Platform> | undefined;
const getDbThrowIfMissing = (platform: Platform) => {
	const db = platform?.env?.DB;
	if (!db) {
		throw new DbError('noBinding', 'DB binding is missing');
	}
	return drizzle(db, { schema: { users } });
};

export const getUser = async (platform: Platform, id: string) => {
	const db = getDbThrowIfMissing(platform);
	const user = await db.query.users.findFirst({ with: { id } });
	return user;
};
