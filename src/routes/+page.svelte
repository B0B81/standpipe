<script lang="ts">
	import { page } from '$app/stores'
	import { superForm } from "sveltekit-superforms/client"
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
	import { standpipeSchema } from '$lib/zod/schema'

	export let data
	let pageSize = 10
	//Fülle totalItems mit Anzahl Standpipes aus +page.server.ts
	$: totalItems = data.totalStandpipes;
	$: totalPages = Math.ceil(totalItems / pageSize)
	$: currentPage = Number($page.params.page) -1
	// $: console.log(totalPages)
	let isModalOpen = false

	$: ({ standpipes, manufacturers } = data)

	const { form, errors, enhance, constraints} = superForm(data.form, { 
	  taintedMessage: "Sicher das du abbrechen möchtest?", 
	  validators: standpipeSchema
  	})
</script>

<div class="grid">
	<div>
		<h2>Standrohre:</h2>

		<div class="overflow-x-auto">
			<table class="table table-compact w-full">
				<thead>
						<tr>
							<th></th>
							<th>Hersteller</th>
							<th>Typ</th> 
							<th>Zählernummer</th>
							<th>Baujahr</th>
							<th></th>
						</tr>
				</thead> 
			  	<tbody>
					{#each standpipes as standpipe}
					<tr>
						<th>{standpipe.standpipeNr}</th> 
						<td>{standpipe.manufacturer}</td>
						<td>{standpipe.type}</td> 
						<td>{standpipe.meteringcode}</td>
						<td>{standpipe.productionYear}</td>
						<td>
							<div class="btn-group">
							<form action="?/deleteStandpipe&id={standpipe.id}" method="POST">
								<div class="pr-1">
									<button class="btn btn-sm btn-square btn-outline" type="submit">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
									</button>
								</div>
							</form>
							<form action="/standpipe/{standpipe.id}">
								<button class="btn btn-sm btn-square btn-outline" type="submit">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13.07 7.008 3.92 3.919-8.511 8.513-3.49.398a.73.73 0 0 1-.827-.827l.398-3.49Zm6.338-.582L17.57 4.588a1.47 1.47 0 0 0-2.082 0l-1.745 1.746 3.919 3.92 1.745-1.746a1.46 1.46 0 0 0 0-2.082z"/></svg>
								</button>
							</form>
							</div>
						</td>
					</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>	
</div>

<div>
	{#each Array(totalPages) as _, idx}
		<a href="{idx + 1}" class={currentPage === idx ? 'text-emerald-300' : ''}>
			{idx +1}
		</a>
	{/each}
</div>	


<!-- <SuperDebug data={$form} /> -->
{#if data.user}
<button class="btn modal-button" on:click={()=>isModalOpen = true}>open modal</button>

<div class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box">
	<div>

		<form action="?/createStandpipe" method="POST">
			<h3>Neues Standrohr</h3>
			<div class="form-control w-full max-w-xs">
				<label
					for="type"
					class="relative block overflow-hidden border-b border-gray-200 pt-3 focus-within:border-blue-600"
					>
					<input
						type="number"
						id="standpipeNr"
						name="standpipeNr"
						placeholder="Nummer"
						bind:value={$form.standpipeNr}
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
					<select bind:value={$form.manufacturer} id="manufacturer" name="manufacturer" placeholder="Hersteller" class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm">
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
						bind:value={$form.type}
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
						bind:value={$form.productionYear}
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
						bind:value={$form.meteringcode}
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
			<div>
				<div class="modal-action">
					<!-- 🔵 set false on click -->
					<button class="btn btn-primary" type="submit">Stabdrohr anlegen</button>
					<button class="btn btn-secondary" on:click={()=>isModalOpen = false}>Abbrechen</button>
				</div>
			</div>
		</form>

	</div>
</div>
</div>
{/if}