<script lang="ts">
	import { resolve } from "$app/paths";
	import { enhance } from "$app/forms";

	let title = '';
	let description = '';
</script>

<section class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
	<div class="w-full max-w-lg bg-white rounded-xl shadow-md p-8">

		<!-- Header -->
		<h1 class="text-2xl font-bold text-gray-800 mb-6">
			Create New Task
		</h1>

		<!-- Form -->
		<form method="POST" use:enhance class="space-y-5">

			<!-- Title -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					Title
				</label>
				<input
					name="title"
					bind:value={title}
					required
					class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
					placeholder="Enter task title"
				/>
			</div>

			<!-- Description -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					Description
				</label>
				<textarea
					name="description"
					bind:value={description}
					rows="4"
					class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
					placeholder="Enter task description"></textarea>
			</div>

			<!-- Buttons -->
			<div class="flex justify-between items-center pt-4">

				<a
					href={resolve('/')}
					class="text-gray-600 hover:text-gray-800 transition">
					← Back
				</a>

				<button
					type="submit"
					class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition">
					Create Task
				</button>

			</div>

		</form>

	</div>
</section>