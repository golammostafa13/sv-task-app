import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tasks } from '$lib/server/db/schema';
import { desc, eq, ilike, or } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url }) => {
	const search = url.searchParams.get('search') ?? '';
	console.log({ search });

	let taskList;

	if (search) {
		taskList = await db
			.select()
			.from(tasks)
			.where(or(ilike(tasks.title, `%${search}%`), ilike(tasks.description, `%${search}%`)))
			.orderBy(desc(tasks.createdAt));
	} else {
		taskList = await db.select().from(tasks).orderBy(desc(tasks.createdAt));
	}

	return {
		tasks: taskList,
		search
	};
};

export const actions: Actions = {
	complete: async ({ request }) => {
		const formData = await request.formData();

		const id = Number(formData.get('id'));

		await db
			.update(tasks)
			.set({
				isCompleted: true,
				updatedAt: new Date()
			})
			.where(eq(tasks.id, id));
	}
};