<script lang="ts">
	import { resolve } from "$app/paths";
	import { enhance } from "$app/forms";

	let title = '';
	let description = '';
	let priority = 'medium';
</script>

<section class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
	<div class="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">

		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-800">
				Create Task
			</h1>
			<p class="text-gray-500 text-sm mt-1">
				Add a new task to your productivity list
			</p>
		</div>

		<form method="POST" use:enhance class="space-y-6">

			<!-- Title -->
			<div class="space-y-2">
				<label class="text-sm font-semibold text-gray-700">
					Task Title
				</label>

				<input
					name="title"
					bind:value={title}
					required
					class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm"
					placeholder="What needs to be done?"
				/>
			</div>

			<!-- Description -->
			<div class="space-y-2">
				<label class="text-sm font-semibold text-gray-700">
					Description
				</label>

				<textarea
					name="description"
					bind:value={description}
					rows="4"
					class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm resize-none"
					placeholder="Add more details...">
				</textarea>
			</div>

			<!-- Priority -->
			<div class="space-y-3">
				<label class="text-sm font-semibold text-gray-700">
					Priority
				</label>

				<div class="flex gap-3">

					<label class="flex-1 cursor-pointer">
						<input
							type="radio"
							name="priority"
							value="high"
							bind:group={priority}
							class="hidden"
						/>

						<div class={`px-4 py-3 rounded-xl border text-center font-medium transition
							${priority === 'high'
								? 'bg-red-500 text-white border-red-500 shadow'
								: 'border-gray-200 hover:border-red-300 text-gray-600'}`}>
							🔴 High
						</div>
					</label>

					<label class="flex-1 cursor-pointer">
						<input
							type="radio"
							name="priority"
							value="medium"
							bind:group={priority}
							class="hidden"
						/>

						<div class={`px-4 py-3 rounded-xl border text-center font-medium transition
							${priority === 'medium'
								? 'bg-yellow-500 text-white border-yellow-500 shadow'
								: 'border-gray-200 hover:border-yellow-300 text-gray-600'}`}>
							🟡 Medium
						</div>
					</label>

					<label class="flex-1 cursor-pointer">
						<input
							type="radio"
							name="priority"
							value="low"
							bind:group={priority}
							class="hidden"
						/>

						<div class={`px-4 py-3 rounded-xl border text-center font-medium transition
							${priority === 'low'
								? 'bg-green-500 text-white border-green-500 shadow'
								: 'border-gray-200 hover:border-green-300 text-gray-600'}`}>
							🟢 Low
						</div>
					</label>

				</div>
			</div>

			<!-- Buttons -->
			<div class="flex justify-between items-center pt-4">

				<a
					href={resolve('/')}
					class="text-gray-500 hover:text-gray-700 font-medium transition">
					← Back
				</a>

				<button
					type="submit"
					class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition">
					Create Task
				</button>

			</div>

		</form>

	</div>
</section>