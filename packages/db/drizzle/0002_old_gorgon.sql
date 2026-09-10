ALTER TYPE "setting" ADD VALUE 'grassland';--> statement-breakpoint
ALTER TABLE "farmers_measure" RENAME COLUMN "applicable_area" TO "applicable_land";--> statement-breakpoint
ALTER TABLE "farmers_measure" ADD COLUMN "applicable_kreis" text;--> statement-breakpoint
-- need to finish the transaction so that the enum value is added before the update
COMMIT;
BEGIN;

-- Update existing records to use the new 'grassland' enum value
UPDATE "farmers_measure" 
SET "setting" = 'grassland' 
WHERE "setting" IN ('permanent grassland', 'pasture land');