<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	$: ({ standpipe } = data)
</script>

<div>
		<form action="?/updateStandpipe" method="POST">
			<h3>Standrohr editieren:</h3>
			<div class="form-control w-full max-w-xs">
				<label for="standpipeNr" class="label">
					<span class="label-text">Nummer</span>
			  	</label>
				<input type="text" inputmode="numeric" id="standpipeNr" name="standpipeNr" class="input input-bordered w-full max-w-xs" value={standpipe.standpipeNr} />
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="manufacturer" class="label">
					<span class="label-text">Hersteller</span>
			  	</label>
				<input type="text" id="manufacturer" name="manufacturer" class="input input-bordered w-full max-w-xs" value={standpipe.manufacturer} />
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="type" class="label">
					<span class="label-text">Typ</span>
			  	</label>
				<input type="text" id="type" name="type" class="input input-bordered w-full max-w-xs" value={standpipe.type} />
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="productionYear" class="label">
					<span class="label-text">Baujahr</span>
			  	</label>
				<input type="text" inputmode="numeric" id="productionYear" name="productionYear" class="input input-bordered w-full max-w-xs" value={standpipe.productionYear} />
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="meteringcode" class="label">
					<span class="label-text">Zählernummer</span>
			  	</label>
				<input type="text" id="meteringcode" name="meteringcode" class="input input-bordered w-full max-w-xs" value={standpipe.meteringcode} />
			</div>
			<div class="w-full max-w-md pt-2">
				<button class="btn btn-primary" type="submit">Änderungen übernehmen</button>
			</div>
		</form>
</div>