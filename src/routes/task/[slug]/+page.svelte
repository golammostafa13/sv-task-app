<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';

	const { data }: { data: PageData } = $props();
</script>

<section class="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
	<div class="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-8">

		<!-- Header -->
		<div class="space-y-1">
			<h1 class="text-3xl font-bold text-gray-900">Task Details</h1>
			<p class="text-gray-500 text-sm">ID: {data.task.id}</p>
		</div>

		<!-- Status & Priority -->
		<div class="flex items-center gap-3">
			<span class={`px-4 py-1 rounded-xl font-semibold text-sm ${
				data.task.isCompleted
					? 'bg-green-100 text-green-800'
					: 'bg-yellow-100 text-yellow-800'
			}`}>
				{data.task.isCompleted ? 'Completed' : 'Pending'}
			</span>

			<span class={`px-4 py-1 rounded-xl font-semibold text-sm ${
				data.task.priority === 'high'
					? 'bg-red-100 text-red-800'
					: data.task.priority === 'medium'
					? 'bg-yellow-100 text-yellow-800'
					: 'bg-green-100 text-green-800'
			}`}>
				{data.task.priority.charAt(0).toUpperCase() + data.task.priority.slice(1)}
			</span>
		</div>

		<!-- Title -->
		<div class="space-y-1">
			<h2 class="text-lg font-semibold text-gray-700">Title</h2>
			<p class="text-gray-900 text-xl font-medium">{data.task.title}</p>
		</div>

		<!-- Description -->
		<div class="space-y-1">
			<h2 class="text-lg font-semibold text-gray-700">Description</h2>
			<p class="text-gray-700 break-words whitespace-pre-wrap bg-gray-50 p-4 rounded-xl shadow-inner">
				{data.task.description || 'No description'}
			</p>
		</div>

		<!-- Dates -->
		<div class="space-y-1 text-sm text-gray-500">
			<p>Created: {new Date(data.task.createdAt).toLocaleString()}</p>
			{#if data.task.updatedAt}
				<p>Updated: {new Date(data.task.updatedAt).toLocaleString()}</p>
			{/if}
			{#if data.task.completedAt}
				<p>Completed: {new Date(data.task.completedAt).toLocaleString()}</p>
			{/if}
		</div>

		<!-- Actions -->
		<div class="flex justify-end gap-3 mt-4">
			<a
				href={resolve("/")}
				class="px-5 py-2 text-gray-500 hover:text-gray-700 font-medium transition rounded-xl">
				← Back
			</a>

			<a
				href={resolve(`/edit/${data.task.id}`)}
				class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition font-medium">
				Edit
			</a>

			<form method="POST" action="?/delete" use:enhance>
				<button
					type="submit"
					class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow transition font-medium">
					Delete
				</button>
			</form>
		</div>

	</div>
</section>