import { pgTable, serial, text, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

/**
 * Optional: task status enum
 */
export const taskStatusEnum = pgEnum('task_status', [
	'pending',
	'in_progress',
	'completed',
	'cancelled'
]);

/**
 * Tasks table
 */
export const tasks = pgTable('tasks', {
	id: serial('id').primaryKey(),

	title: text('title').notNull(),

	description: text('description'),

	status: taskStatusEnum('status').notNull().default('pending'),

	isCompleted: boolean('is_completed').notNull().default(false),

	createdAt: timestamp('created_at', {
		withTimezone: true
	})
		.notNull()
		.defaultNow(),

	updatedAt: timestamp('updated_at', {
		withTimezone: true
	})
		.notNull()
		.defaultNow(),

	completedAt: timestamp('completed_at', {
		withTimezone: true
	})
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;