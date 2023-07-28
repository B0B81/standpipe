<script lang="ts">
	import { superForm } from "sveltekit-superforms/client"
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
	// import { standpipeSchema } from '$lib/zod/schema'
	import type { PageData } from './$types'
	export let data: PageData
	// const { form, errors, enhance, constraints} = superForm(data.form, { 
	//   taintedMessage: "Sicher das du abbrechen möchtest?", 
	//   validators: manufacturerSchema
  	// })
//	
	$: ({ manufacturer } = data)
</script>

<div>
		<form action="?/updateManufacturer" method="POST">
			<h3>Standrohr editieren:</h3>
			<div class="form-control w-full max-w-xs">
				<label
					for="companyname"
					class="relative block overflow-hidden border-b border-gray-200 pt-3 focus-within:border-blue-600"
					>
					<input
						type="text"
						id="companyname"
						name="companyname"
						placeholder="Hersteller"
						bind:value={manufacturer.companyname}
						class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
					/>

					<span
					class="absolute left-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
					>
						Typ
					</span>
				</label>
				<!-- {#if $errors.type}
					<p class="text-red-500 text-xs">{$errors.companyname}</p>
				{/if} -->
			</div>
			<div class="w-full max-w-md pt-2">
				<button class="btn btn-primary" type="submit">Änderungen übernehmen</button>
			</div>
		</form>
</div>