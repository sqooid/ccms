import type { Handle } from '@sveltejs/kit';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import GitHub from '@auth/core/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { drizzle } from 'drizzle-orm/d1';

export const handle: Handle = async ({ event, resolve }) => {
	const { handle, signIn, signOut } = SvelteKitAuth({
		providers: [Google, GitHub],
		trustHost: true,
		adapter: DrizzleAdapter(drizzle(event.platform?.env?.DB as D1Database)),
		session: { strategy: 'jwt' }
	});
	return handle({ event, resolve });
};
