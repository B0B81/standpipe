<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ users } = data)
</script>

<div class="grid">
	<div>
		<h2>Benutzer:</h2>

		<div class="overflow-x-auto">
			<table class="table table-compact w-full">
				<thead>
						<tr>
							<th>Benutzername</th>
							<th>E-Mail</th>
							<th>Vorname</th> 
							<th>Nachname</th>
							<th>Admin</th>
							<th>ID</th>
							<th></th>
						</tr>
				</thead> 
			  	<tbody>
					{#each users as user}
					<tr>
						<th>{user.username}</th> 
						<td>{user.email}</td>
						<td>{user.firstname}</td> 
						<td>{user.lastname}</td>
						<td>{user.admin}</td>
						<td>{user.id}</td>
						<td>
							<div class="btn-group">
							<form action="?/deleteUser&id={user.id}" method="POST">
								<div class="pr-1">
									<button class="btn btn-sm btn-square btn-outline" type="submit">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
									</button>
								</div>
							</form>
							<form action="/admin/user/{user.id}">
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

	