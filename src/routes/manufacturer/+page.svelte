<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ manufacturers } = data)
</script>

<div class="grid">
	<div>
		<h2>Hersteller:</h2>

		<div class="overflow-x-auto">
			<table class="table table-compact w-full">
				<thead>
						<tr>
							<th>Herstellername</th>
						</tr>
				</thead> 
			  	<tbody>
					{#each manufacturers as manufacturer}
					<tr>
						<th>{manufacturer.companyname}</th> 
						<td>
							<div class="btn-group">
							<form action="?/deleteManufacturer&id={manufacturer.id}" method="POST">
								<div class="pr-1">
									<button class="btn btn-sm btn-square btn-outline" type="submit">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
									</button>
								</div>
							</form>
							<form action="/manufacturer/{manufacturer.id}">
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

	