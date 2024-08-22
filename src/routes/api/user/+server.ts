import { createUser } from '$lib/db/queries';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { DbError } from '$lib/db/types';

export const POST: RequestHandler = async ({ platform, request }) => {
	const { username, bcrypt, role } = await request.json();
	try {
		const newUuid = await createUser(platform, { username, bcrypt, role });
		// do some stuff
		return redirect(307, '/admin');
	} catch (e) {
		if (e instanceof DbError) {
			error(500, e.message);
		}
		throw e;
	}
};
