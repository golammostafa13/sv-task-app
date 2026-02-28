import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { tasks } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {

		const formData = await request.formData();

		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const priority = formData.get('priority') as string;

		await db.insert(tasks).values({
			title,
			description,
			priority
		});

		throw redirect(303, '/');
	}
};