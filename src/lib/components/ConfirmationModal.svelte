<script>
	import {enhance} from '$app/forms';
	const {closeModal, selectedTaskId} = $props();
</script>

<div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

	<div class="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">

		<h2 class="text-lg font-semibold mb-3">
			Mark as completed?
		</h2>

		<p class="text-gray-600 text-sm mb-6">
			This task will be marked as completed.
		</p>

		<div class="flex justify-end gap-3">

			<button
				onclick={closeModal}
				class="px-4 py-2 text-gray-600 hover:text-gray-800">
				Cancel
			</button>

			<form
				method="POST"
				action="?/complete"
				use:enhance={() => {
						return async ({ update }) => {
							await update();
							closeModal();
						};
					}}
			>
				<input type="hidden" name="id" value={selectedTaskId} />

				<button
					type="submit"
					class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
					Confirm
				</button>

			</form>

		</div>

	</div>

</div>