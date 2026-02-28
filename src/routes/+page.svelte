<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import { fade, slide, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const { data } = $props();

	let showModal = $state(false);
	let selectedTaskId = $state<number | null>(null);

	// Use page state for the initial search value
	let searchQuery = $state(page.url.searchParams.get('search') || '');

	function openModal(id: number) {
		const task = data.tasks.find((t) => t.id === id);
		if (task?.isCompleted) return;
		selectedTaskId = id;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		selectedTaskId = null;
	}

	// Modern Debounce Pattern in Svelte 5
	$effect(() => {
		const timeout = setTimeout(() => {
			const url = new URL(page.url);
			if (searchQuery) {
				url.searchParams.set('search', searchQuery);
			} else {
				url.searchParams.delete('search');
			}

			if (url.search !== page.url.search) {
				goto(url, { replaceState: true, keepFocus: true, noScroll: true });
			}
		}, 300);

		return () => clearTimeout(timeout);
	});
</script>
<section class="p-5 mx-auto ">
<div class="mx-auto max-w-2xl px-4 flex items-center justify-between">
	<h1 class="text-2xl font-bold text-gray-800">My Tasks</h1>
	<a
		href={resolve('/create')}
		class="group flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:green-700 hover:shadow-blue-300 active:scale-95"
	>
		<svg class="h-5 w-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
			<path d="M12 5v14M5 12h14"/>
		</svg>
		<span>New Task</span>
	</a>
</div>

<div class="mx-auto my-8 max-w-2xl px-4">
	<div class="relative group">
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-blue-500">
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
		</div>
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Search your tasks..."
			class="w-full rounded-2xl border border-gray-100 bg-white py-3 pl-11 pr-4 text-gray-700 shadow-sm outline-none ring-blue-100 transition-all focus:border-blue-400 focus:ring-4"
		/>
	</div>
</div>

<div class="mx-auto max-w-2xl space-y-4 px-4">
	{#each data.tasks as task (task.id)}
		<div
			animate:flip={{ duration: 300 }}
			in:fly={{ y: 20, duration: 400 }}
			class="group relative flex items-center justify-between rounded-2xl border border-gray-50 bg-white p-4 shadow-sm transition-all hover:border-blue-100 hover:shadow-md active:scale-[0.99]"
		>
			<div class="flex items-center gap-4">
				<button
					onclick={() => openModal(task.id)}
					class="flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all
          {task.isCompleted ? 'bg-emerald-500 border-emerald-500 scale-110' : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50'}"
				>
					{#if task.isCompleted}
						<svg in:scale class="h-4 w-4 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
					{/if}
				</button>

				<div>
					<h2 class="font-semibold transition-colors {task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800 group-hover:text-blue-600'}">
						{task.title}
					</h2>
					{#if task.description}
						<p class="mt-0.5 text-xs text-gray-500 line-clamp-1">{task.description}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center gap-3">
        <span class="hidden sm:inline-flex rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
          {task.priority === 'high' ? 'bg-red-50 text-red-600' :
           task.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}">
          {task.priority}
        </span>

				<a
					href={resolve(`/task/${task.id}`)}
					class="rounded-lg bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
				>
					Details
				</a>
			</div>
		</div>
	{:else}
		<div in:fade class="flex flex-col items-center justify-center rounded-3xl bg-gray-50/50 py-16 text-center border-2 border-dashed border-gray-100">
			<div class="mb-3 text-4xl text-gray-300">🔍</div>
			<p class="font-medium text-gray-500">No tasks found matching your search</p>
			<button onclick={() => searchQuery = ''} class="mt-2 text-sm text-blue-500 hover:underline">Clear search</button>
		</div>
	{/each}
</div>

{#if showModal}
	<ConfirmationModal {closeModal} {selectedTaskId} />
{/if}
</section>