<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';
	const onSignIn = () => {
		signIn();
	};
	const onSignOut = () => {
		signOut();
	};
	export let data: PageData;
	console.log(data.session);
</script>

<div>
	<nav>
		<img src="/img/logo.svg" alt="Company Logo" />
		<button on:click={onSignIn}>Sign In</button>
		<button on:click={onSignOut}>Sign Out</button>
	</nav>
</div>
