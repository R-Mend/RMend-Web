CREATE TYPE "region_type" AS ENUM('state', 'county', 'municipality');--> statement-breakpoint
CREATE TYPE "report_status" AS ENUM('new', 'triage', 'assigned', 'in_progress', 'resolved');--> statement-breakpoint
CREATE TABLE "coverage_area" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"organization_id" text NOT NULL,
	"geom" point NOT NULL,
	"active" boolean NOT NULL,
	"priority" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "issue_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"parent_id" text,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "region" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"type" "region_type" NOT NULL,
	"name" text NOT NULL,
	"geom" geometry(MultiPolygon,4326) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "report" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"geom" point NOT NULL,
	"issue_category_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"status" "report_status",
	"reporterContact" text,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
