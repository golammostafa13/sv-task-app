<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import {resolve} from '$app/paths';

	const { data }: { data: PageData } = $props();

	let title = $state('');
	let description = $state('');
	let isCompleted = $state(false);

	$effect(() => {
		title = data.task.title;
		description = data.task.description ?? '';
		isCompleted = data.task.isCompleted;
	});
</script>

<section class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
	<div class="w-full max-w-lg bg-white rounded-xl shadow-md p-8">

		<h1 class="text-2xl font-bold text-gray-800 mb-6">
			Edit Task
		</h1>

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
					class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
				/>
			</div>

			<!-- Description -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					Description
				</label>

				<textarea
					name="description"
					rows="4"
					bind:value={description}
					class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
				</textarea>
			</div>

			<!-- Completed -->
			<div class="flex items-center gap-2">
				<input
					type="checkbox"
					name="isCompleted"
					bind:checked={isCompleted}
					class="w-4 h-4"
				/>

				<label class="text-sm text-gray-700">
					Mark as completed
				</label>
			</div>

			<!-- Buttons -->
			<div class="flex justify-between pt-4">

				<a
					href={resolve(`/task/${data.task.id}`)}
					class="text-gray-600 hover:text-gray-800">
					Cancel
				</a>

				<button
					type="submit"
					class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
					Update Task
				</button>

			</div>

		</form>

	</div>
</section>