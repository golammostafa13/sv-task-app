import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { tasks } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.slug);

	const result = await db
		.select()
		.from(tasks)
		.where(eq(tasks.id, id))
		.limit(1);

	const task = result[0];

	if (!task) {
		throw error(404, 'Task not found');
	}

	return { task };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = Number(params.slug);
		const formData = await request.formData();

		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const isCompleted = formData.get('isCompleted') === 'on';

		await db
			.update(tasks)
			.set({
				title,
				description,
				isCompleted,
				updatedAt: new Date()
			})
			.where(eq(tasks.id, id));

		throw redirect(303, `/task/${id}`);
	}
};

