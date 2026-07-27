CREATE TABLE "coverage_area_categories" (
	"coverage_area_id" uuid,
	"issue_category_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "coverage_area_categories_pkey" PRIMARY KEY("coverage_area_id","issue_category_id")
);
--> statement-breakpoint
ALTER TABLE "coverage_area_categories" ADD CONSTRAINT "coverage_area_categories_coverage_area_id_coverage_area_id_fkey" FOREIGN KEY ("coverage_area_id") REFERENCES "coverage_area"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "coverage_area_categories" ADD CONSTRAINT "coverage_area_categories_aOnbKvZQbz6l_fkey" FOREIGN KEY ("issue_category_id") REFERENCES "issue_category"("id") ON DELETE CASCADE;