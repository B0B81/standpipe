<script lang="ts">
	import '../app.postcss'
	import { Toaster } from 'svelte-french-toast'
	import Nav from '$lib/components/nav.svelte'
	import type { PageData } from './$types'
	export let data: PageData
</script>


<div class="min-h-full">
	<div class="navbar bg-base-200">
		<div class="navbar-start">
		  <div class="dropdown">
			<label for="dropdown" role="button" tabindex="0" class="btn btn-ghost btn-circle">
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
			</label>
			<ul tabindex="0" role="button" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
			  <li><a href="/">Homepage</a></li>
			  <li><a href="/admin">Adminpage</a></li>
			  <li><a href="/manufacturer">Manufacturer</a></li>
			</ul>
		  </div>
		</div>
		<div class="navbar-center">
		  <a href="/" class="btn btn-ghost normal-case text-xl">Standrohr Manager</a>
		</div>
		<div class="navbar-end">
			<form method="POST">
				{#if !data.user}
					<a href="/login" class="btn btn-primary">Login</a>
					<a href="/register" class="btn btn-secondary">Register</a>
				{:else}
					<button class="btn btn-outline" formaction="/logout" type="submit">Logout</button>
				{/if}
			</form>
		</div>
	</div>
	<div class="py-4">
		<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
			<slot />
		</div>
	</div>
</div>