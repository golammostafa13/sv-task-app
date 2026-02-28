<script lang="ts">
	import type { PageData } from './$types';
	import {resolve} from '$app/paths'
	import { enhance } from '$app/forms';

	const { data }: { data: PageData } = $props();
</script>

<section class="min-h-screen bg-gray-50 py-10 px-4">
	<div class="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">

		<!-- Header -->
		<div class="flex justify-between items-start mb-6">

			<div>
				<h1 class="text-3xl font-bold text-gray-800">
					Task Details
				</h1>

				<p class="text-sm text-gray-400 mt-1">
					ID: {data.task.id}
				</p>
			</div>

			<span
				class="text-sm font-medium px-3 py-1 rounded-full
				{data.task.isCompleted
					? 'bg-green-100 text-green-700'
					: 'bg-yellow-100 text-yellow-700'}">

				{data.task.isCompleted ? 'Completed' : 'Pending'}

			</span>

		</div>

		<!-- Title -->
		<div class="mb-6">
			<h2 class="text-lg font-semibold text-gray-700 mb-2">
				Title
			</h2>

			<p class="text-gray-800 text-xl font-medium">
				{data.task.title}
			</p>
		</div>

		<!-- Description -->
		<div class="mb-6">
			<h2 class="text-lg font-semibold text-gray-700 mb-2">
				Description
			</h2>

			<p class="text-gray-600">
				{data.task.description || 'No description'}
			</p>
		</div>

		<!-- Dates -->
		<div class="space-y-2 text-sm text-gray-500">

			<p>
				Created:
				{new Date(data.task.createdAt).toLocaleString()}
			</p>

			{#if data.task.updatedAt}
				<p>
					Updated:
					{new Date(data.task.updatedAt).toLocaleString()}
				</p>
			{/if}

		</div>

		<!-- Actions -->
		<div class="flex justify-between mt-8">

			<a
				href={resolve("/")}
				class="text-gray-600 hover:text-gray-800">
				← Back
			</a>

			<div class="space-x-3 flex">

				<a
					href={resolve(`/task/edit/${data.task.id}`)}
					class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
					Edit
				</a>

				<form
					method="POST"
					action="?/delete"
					use:enhance
				>
					<button
						type="submit"
						class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
						Delete
					</button>
				</form>

			</div>

		</div>

	</div>
</section>