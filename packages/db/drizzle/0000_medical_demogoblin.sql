DO $$ BEGIN
 CREATE TYPE "public"."measure_status" AS ENUM('active', 'shortlisted', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."animal_type" AS ENUM('cow', 'pig', 'poultry', 'sheep_goats', 'others');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."type_of_farming" AS ENUM('conventional', 'organic');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."effort" AS ENUM('high', 'medium', 'low');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."key_date_type" AS ENUM('by', 'from');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."setting" AS ENUM('arable land', 'permanent grassland', 'pasture land', 'no specification', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."situation" AS ENUM('rotating', 'whole farm', 'fixed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."subsidy_provider" AS ENUM('AUKM', 'ÖR', 'VNS', 'Private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farmers_account" (
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "farmers_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farmers_session" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farmers_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"email_verified" timestamp,
	"image" text,
	"notifications_enabled" boolean DEFAULT true,
	"user_measures" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farmers_verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP(3) + INTERVAL '2 months',
	"used_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP(3),
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farmers_verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "farmers_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farmers_farm" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"farm_size" integer NOT NULL,
	"type_of_farming" "type_of_farming" DEFAULT 'conventional' NOT NULL,
	"location" varchar NOT NULL,
	"animal_type" animal_type[],
	"livestock_unit" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "farmers_measure" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"measure_identifier" text NOT NULL,
	"measure_title_long" text NOT NULL,
	"measure_title_short" text NOT NULL,
	"program_title" varchar(255) NOT NULL,
	"publication_date" timestamp NOT NULL,
	"publication_source" varchar(255) NOT NULL,
	"application_date" timestamp NOT NULL,
	"applicable_area" text NOT NULL,
	"subsidy_value" integer,
	"subsidy_value_conventional" integer,
	"subsidy_value_organic" integer,
	"surcharges" json,
	"include_warning" boolean,
	"provider_email" text,
	"provider_phone_number" text,
	"effort" "effort" NOT NULL,
	"effort_tool_tip" text,
	"duration" integer NOT NULL,
	"duration_tool_tip" text,
	"setting" "setting" NOT NULL,
	"setting_tool_tip" text,
	"situation" "situation" NOT NULL,
	"situation_tool_tip" text,
	"whats_involved" text NOT NULL,
	"cultivation_conditions" text[] NOT NULL,
	"plant_protection_measures" text[],
	"fertilizer" text[],
	"key_benefits" text[],
	"key_dates" jsonb,
	"area_optimization" jsonb,
	"combinations" boolean NOT NULL,
	"combinations_description" text,
	"application_steps" jsonb NOT NULL,
	"application_description" text,
	"available_combination" text,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp,
	"total_amount" integer NOT NULL,
	"type_of_farming" "type_of_farming" DEFAULT 'conventional' NOT NULL,
	"contacts" jsonb,
	"notes" text,
	"location" text,
	"zipcodes" text,
	"publish_view" boolean DEFAULT false NOT NULL,
	CONSTRAINT "farmers_measure_measure_identifier_unique" UNIQUE("measure_identifier")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "farmers_account" ADD CONSTRAINT "farmers_account_user_id_farmers_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."farmers_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "farmers_session" ADD CONSTRAINT "farmers_session_user_id_farmers_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."farmers_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "farmers_verification" ADD CONSTRAINT "farmers_verification_user_id_farmers_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."farmers_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "farmers_farm" ADD CONSTRAINT "farmers_farm_user_id_farmers_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."farmers_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
