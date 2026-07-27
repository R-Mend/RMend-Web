-- Custom SQL migration file, put your code below! --
ALTER TABLE "coverage_area"
  ADD CONSTRAINT "coverage_area_organization_id_organization_id_fk"
  FOREIGN KEY ("organization_id")
  REFERENCES "neon_auth"."organization"("id")
  ON DELETE CASCADE;

ALTER TABLE "report"
  ADD CONSTRAINT "report_organization_id_organization_id_fk"
  FOREIGN KEY ("organization_id")
  REFERENCES "neon_auth"."organization"("id")
  ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS "report_organization_id_idx"
  ON "report" ("organization_id");