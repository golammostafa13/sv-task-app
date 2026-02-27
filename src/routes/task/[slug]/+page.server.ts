import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tasks } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

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

	return {
		task
	};
};