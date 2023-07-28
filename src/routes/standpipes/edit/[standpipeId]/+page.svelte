<script lang="ts">
	import { superForm } from "sveltekit-superforms/client"
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
	import { standpipeSchema } from '$lib/zod/schema'
	import type { PageData } from '../../[page]/[standpipeId]/$types'
	export let data: PageData
	const { form, errors, enhance, constraints} = superForm(data.form, { 
	  taintedMessage: "Sicher das du abbrechen möchtest?", 
	  validators: standpipeSchema
  	})

	$: ({ standpipe } = data.standpipe)
	$: manufacturers = data.manufacturers

</script>

<SuperDebug data={$form} />

<div>
		<form action="?/updateStandpipe" method="POST">
			<h3>Standrohr editieren:</h3>
			<div class="form-control w-full max-w-xs">
				<label
					for="standpipeNr"
					class="relative block overflow-hidden border-b border-gray-200 pt-3 focus-within:border-blue-600"
					>
					<input
						type="text"
						id="standpipeNr"
						name="standpipeNr"
						bind:value={standpipe.standpipeNr}
						placeholder="Nummer"
						class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
					/>

					<span
					class="absolute left-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
					>
						Nummer
					</span>
				</label>
				{#if $errors.standpipeNr}
					<p class="text-red-500 text-xs">{$errors.standpipeNr}</p>
				{/if}
			</div>
			<div class="form-control w-full max-w-xs">
				<label
					for="manufacturer"
					class="relative block overflow-hidden border-b border-gray-200 pt-3 focus-within:border-blue-600"
					>
					<select bind:value={standpipe.manufacturer} id="manufacturer" name="manufacturer" placeholder="Hersteller" class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm">
						{#each manufacturers as manufacturer}
							<option value={manufacturer.companyname}>{manufacturer.companyname}</option>
						{/each}
					</select>

					<span
					class="absolute left-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
					>
						Hersteller
					</span>
				</label>
				{#if $errors.manufacturer}
					<p class="text-red-500 text-xs">{$errors.manufacturer}</p>
				{/if}
			</div>
			<div class="form-control w-full max-w-xs">
				<label
					for="type"
					class="relative block overflow-hidden border-b border-gray-200 pt-3 focus-within:border-blue-600"
					>
					<input
						type="text"
						id="type"
						name="type"
						placeholder="Typ"
						bind:value={standpipe.type}
						class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
					/>

					<span
					class="absolute left-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
					>
						Typ
					</span>
				</label>
				{#if $errors.type}
					<p class="text-red-500 text-xs">{$errors.type}</p>
				{/if}
			</div>
			<div class="form-control w-full max-w-xs">
				<label
					for="productionYear"
					class="relative block overflow-hidden border-b border-gray-200 pt-3 focus-within:border-blue-600"
					>
					<input
						type="text"
						id="productionYear"
						name="productionYear"
						placeholder="Baujahr"
						bind:value={standpipe.productionYear}
						class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
					/>

					<span
					class="absolute left-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
					>
						Baujahr
					</span>
				</label>
				{#if $errors.productionYear}
					<p class="text-red-500 text-xs">{$errors.productionYear}</p>
				{/if}
			</div>
			<div class="form-control w-full max-w-xs">
				<label
					for="meterincode"
					class="relative block overflow-hidden border-b border-gray-200 pt-3 focus-within:border-blue-600"
					>
					<input
						type="text"
						id="meteringcode"
						name="meteringcode"
						placeholder="Zählernummer"
						bind:value={standpipe.meteringcode}
						class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
					/>

					<span
					class="absolute left-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
					>
						Zählernummer
					</span>
				</label>
				{#if $errors.meteringcode}
					<p class="text-red-500 text-xs">{$errors.meteringcode}</p>
				{/if}
			</div>
			<div class="w-full max-w-md pt-2">
				<button class="btn btn-primary" type="submit">Änderungen übernehmen</button>
			</div>
		</form>
</div>