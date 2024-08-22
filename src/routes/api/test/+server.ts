import { createUser, getUser } from '$lib/db/queries';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createJwt, verifyJwt } from '$lib/auth';

export const GET: RequestHandler = async ({ platform }) => {
	const user = await getUser(platform, 'fffb020a-735e-463c-8905-b8e7b6c36576');
	if (!user) return json({});
	const token = createJwt(user);
	const decoded = verifyJwt(token);
	return json(user);
};
