import {
  pgTable,
  text,
  uuid,
  pgEnum,
  point,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';
import { multiPolygon, timestamps } from './column.helpers';

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
    ...timestamps
});

export const CoverageArea = pgTable('coverage_area', {
    id: uuid('id').defaultRandom().primaryKey(),
    organizationId: text('organization_id').notNull(),
    geom: point().notNull(),
    active: boolean().notNull(),
    priority: integer().default(0),
    ...timestamps
});

// TODO: should this be tied to organization in to make creation and editing easier?
export const IssueCategory = pgTable('issue_category', {
    id: uuid('id').defaultRandom().primaryKey(),
    parentId: text('parent_id'),
    name: text().notNull(),
    slug: text().notNull(),
    ...timestamps
});

export const regionTypeEnum = pgEnum('region_type', ['state', 'county', 'municipality']);

export const Region = pgTable('region', {
    id: uuid('id').defaultRandom().primaryKey(),
    type: regionTypeEnum().notNull(),
    name: text().notNull(),
    geom: multiPolygon("geom").notNull(),
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

// export const invitationInNeonAuth = neonAuth.table("invitation", {
// 	id: uuid().defaultRandom().primaryKey(),
// 	organizationId: uuid().notNull().references(() => organizationInNeonAuth.id, { onDelete: "cascade" } ),
// 	email: text().notNull(),
// 	role: text(),
// 	status: text().notNull(),
// 	expiresAt: timestamp({ withTimezone: true }).notNull(),
// 	createdAt: timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
// 	inviterId: uuid().notNull().references(() => userInNeonAuth.id, { onDelete: "cascade" } ),
// }, (table) => [
// 	index("invitation_email_idx").using("btree", table.email.asc().nullsLast()),
// 	index("invitation_organizationId_idx").using("btree", table.organizationId.asc().nullsLast()),
// ]);