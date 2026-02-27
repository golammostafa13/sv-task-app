import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tasks } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	console.log('server load...');
	const taskList = await db.select().from(tasks).orderBy(desc(tasks.createdAt));
	console.log('server load...');
	return {
		tasks: taskList
	};
};
