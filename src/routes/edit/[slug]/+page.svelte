<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	const { data }: { data: PageData } = $props();

	let title = $state('');
	let description = $state('');
	let isCompleted = $state(false);
	let priority = $state('medium');

	$effect(() => {
		title = data.task.title;
		description = data.task.description ?? '';
		isCompleted = data.task.isCompleted;
		priority = data.task.priority ?? 'medium';
	});
</script>

<section class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
	<div class="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">

		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-800">Edit Task</h1>
			<p class="text-gray-500 text-sm mt-1">
				Update your task details and priority
			</p>
		</div>

		<!-- Form -->
		<form method="POST" use:enhance class="space-y-6">

			<!-- Title -->
			<div class="space-y-2">
				<label class="text-sm font-semibold text-gray-700">Task Title</label>
				<input
					name="title"
					bind:value={title}
					required
					class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm"
					placeholder="Enter task title"
				/>
			</div>

			<!-- Description -->
			<div class="space-y-2">
				<label class="text-sm font-semibold text-gray-700">Description</label>
				<textarea
					name="description"
					bind:value={description}
					rows="4"
					class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm resize-none whitespace-pre-wrap break-words"
					placeholder="Enter task description"
				></textarea>
			</div>

			<!-- Priority -->
			<div class="space-y-2">
				<label class="text-sm font-semibold text-gray-700">Priority</label>
				<div class="flex gap-3">
					{#each ['high', 'medium', 'low'] as p (p)}
						<label class="flex-1 cursor-pointer">
							<input type="radio" name="priority" value={p} bind:group={priority} class="hidden" />
							<div class={`px-4 py-3 rounded-xl border text-center font-medium transition
								${priority === p
									? p === 'high' ? 'bg-red-500 text-white border-red-500 shadow'
									: p === 'medium' ? 'bg-yellow-500 text-white border-yellow-500 shadow'
									: 'bg-green-500 text-white border-green-500 shadow'
									: 'border-gray-200 hover:border-gray-300 text-gray-600'}`}>
								{p === 'high' ? '🔴 High' : p === 'medium' ? '🟡 Medium' : '🟢 Low'}
							</div>
						</label>
					{/each}
				</div>
			</div>

			<!-- Completed -->
			<div class="flex items-center gap-2">
				<input type="checkbox" name="isCompleted" bind:checked={isCompleted} class="w-4 h-4" />
				<label class="text-sm text-gray-700">Mark as completed</label>
			</div>

			<!-- Buttons -->
			<div class="flex justify-between pt-4">
				<a href={resolve(`/task/${data.task.id}`)} class="text-gray-500 hover:text-gray-700 font-medium transition">Cancel</a>

				<button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition">
					Update Task
				</button>
			</div>

		</form>
	</div>
</section>