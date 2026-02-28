<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state'; // Using the modern state module
	import favicon from '$lib/assets/favicon.svg';
	import { fade, scale } from 'svelte/transition';

	let showDropdown = $state(false);

	// Close dropdown if user clicks outside (optional helper)
	function toggleDropdown() {
		showDropdown = !showDropdown;
	}

	function logout() {
		console.log('logout clicked');
		showDropdown = false;
	}

	// Helper to check active route for styling
	const isActive = (path: string) => page.url.pathname === path;
</script>

<nav class="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">

			<div class="flex items-center gap-8">
				<a href={resolve('/')} class="flex items-center gap-2.5 transition-opacity hover:opacity-90">
					<img src={favicon} alt="Logo" class="h-8 w-8 rounded-lg shadow-sm" />
					<span class="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-xl font-bold tracking-tight text-transparent">
            TaskFlow
          </span>
				</a>

				<div class="hidden md:flex md:items-center md:gap-1">
					{#each [{name: 'Dashboard', path: '/dashboard'}, {name: 'Tasks', path: '/'}, {name: 'About', path: '/about'}] as link (link.name)}
						<a
							href={resolve(link.path)}
							class="rounded-md px-3 py-2 text-sm font-medium transition-colors
              {isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
						>
							{link.name}
						</a>
					{/each}
				</div>
			</div>

			<div class="relative">
				<button
					onclick={toggleDropdown}
					class="group flex items-center gap-2 rounded-full border border-gray-200 p-1 pr-3 transition-all hover:border-blue-200 hover:bg-blue-50 focus:outline-none"
				>
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 font-bold text-white shadow-sm">
						M
					</div>
					<svg
						class="h-4 w-4 text-gray-400 transition-transform duration-200 {showDropdown ? 'rotate-180' : ''}"
						viewBox="0 0 20 20" fill="currentColor"
					>
						<path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
					</svg>
				</button>

				{#if showDropdown}
					<div
						in:scale={{ duration: 150, start: 0.95 }}
						out:fade={{ duration: 100 }}
						class="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-gray-100 bg-white p-1 shadow-xl ring-1 ring-black/5 z-50"
					>
						<div class="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Account</div>

						<a
							href={resolve('/profile')}
							class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
							My Profile
						</a>

						<div class="my-1 border-t border-gray-100"></div>

						<button
							onclick={logout}
							class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
							Logout
						</button>
					</div>
				{/if}
			</div>

		</div>
	</div>
</nav>