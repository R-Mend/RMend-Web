import {
  pgTable,
  pgSchema,
  text,
  timestamp,
  uuid,
  pgEnum,
  point,
} from 'drizzle-orm/pg-core';

// ---------------------------------------------------------------------------
// App tables (public schema) — managed by `drizzle-kit push`
// ---------------------------------------------------------------------------

export const reportStatusEnum = pgEnum('report_status', ['new', 'triage', 'assigned', 'in_progress', 'resolved']);

export const report = pgTable('report', {
    id: uuid('id').defaultRandom().primaryKey(),
    geom: point().notNull(),
    issueCategory: text('issue_category_id').notNull(),
    organizationId: text('organization_id').notNull(),
    status: reportStatusEnum(),
    reporterContact: text(), // TODO: consider updating to userId
    description: text(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});


// ---------------------------------------------------------------------------
// neon_auth schema — these tables are managed by Neon Auth, NOT by drizzle-kit push.
//
// The definitions below were obtained by running `drizzle-kit pull` with
// schemaFilter: ['public', 'neon_auth'] in drizzle.config.ts, then copying
// only the tables needed for server-side operations (e.g. the admin org
// creation endpoint) into this file.
//
// This file is the single source of truth for Drizzle schema in this app.
// ---------------------------------------------------------------------------
// const neonAuth = pgSchema('neon_auth');

// export const memberInNeonAuth = neonAuth.table('member', {
// 	id: uuid().defaultRandom().primaryKey(),
// 	organizationId: uuid().notNull(),
// 	userId: uuid().notNull(),
// 	role: text().notNull(),
// 	createdAt: timestamp({ withTimezone: true }).notNull(),
// });

// export const organizationInNeonAuth = neonAuth.table('organization', {
// 	id: uuid().defaultRandom().primaryKey(),
// 	name: text().notNull(),
// 	slug: text().notNull(),
// 	logo: text(),
// 	createdAt: timestamp({ withTimezone: true }).notNull(),
// 	metadata: text(),
// });