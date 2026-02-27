<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const { data } = $props();
</script>

<section class="min-h-screen bg-gray-50 py-10 px-4">
	<div class="max-w-2xl mx-auto">

		<!-- Header -->
		<div class="flex items-center justify-between mb-6">
			<h1 class="text-3xl font-bold text-gray-800">Tasks List</h1>

			<button
				class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
				onclick={() => goto(resolve('/create'))}>
				+ Add Task
			</button>
		</div>

		<!-- Tasks container -->
		<div class="bg-white rounded-xl shadow-md divide-y">

			{#if data.tasks.length === 0}
				<div class="p-6 text-center text-gray-500">
					No tasks found
				</div>
			{:else}
				{#each data.tasks as task (task.id)}
					<div
						class="p-5 bg-white rounded-lg shadow hover:shadow-md transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

						<!-- Left: Task info -->
						<div class="flex-1">
							<h2 class="text-lg font-semibold text-gray-800">{task.title}</h2>

							{#if task.description}
								<p class="text-gray-600 text-sm mt-1">{task.description}</p>
							{/if}

							<p class="text-xs text-gray-400 mt-2">
								Created: {new Date(task.createdAt).toLocaleString()}
							</p>
						</div>

						<!-- Right: Status badge + Details button -->
						<div class="flex items-center gap-3 mt-3 sm:mt-0">
				<span
					class={`text-xs font-medium px-3 py-1 rounded-full ${
						task.isCompleted
							? 'bg-green-100 text-green-700'
							: 'bg-yellow-100 text-yellow-700'
					}`}>
					{task.isCompleted ? 'Completed' : 'Pending'}
				</span>

							<a
								href={resolve(`/task/${task.id}`)}
								class="px-4 py-2 bg-amber-300 text-sm font-medium rounded-lg hover:bg-amber-400 transition">
								Details
							</a>
						</div>
					</div>
				{/each}
			{/if}

		</div>

	</div>
</section>