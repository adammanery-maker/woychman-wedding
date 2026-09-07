import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_wedding_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__wedding_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "wedding_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"person_one_display_name" varchar,
  	"person_two_display_name" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"city" varchar,
  	"province_region" varchar,
  	"country" varchar,
  	"timezone" varchar DEFAULT 'America/Edmonton',
  	"rsvp_enabled" boolean DEFAULT false,
  	"rsvp_deadline" timestamp(3) with time zone,
  	"rsvp_button_label" varchar DEFAULT 'RSVP',
  	"contact_name" varchar,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"allow_search_indexing" boolean DEFAULT false,
  	"_status" "enum_wedding_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_wedding_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_person_one_display_name" varchar,
  	"version_person_two_display_name" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_city" varchar,
  	"version_province_region" varchar,
  	"version_country" varchar,
  	"version_timezone" varchar DEFAULT 'America/Edmonton',
  	"version_rsvp_enabled" boolean DEFAULT false,
  	"version_rsvp_deadline" timestamp(3) with time zone,
  	"version_rsvp_button_label" varchar DEFAULT 'RSVP',
  	"version_contact_name" varchar,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version_allow_search_indexing" boolean DEFAULT false,
  	"version__status" "enum__wedding_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE INDEX "wedding_settings__status_idx" ON "wedding_settings" USING btree ("_status");
  CREATE INDEX "_wedding_settings_v_version_version__status_idx" ON "_wedding_settings_v" USING btree ("version__status");
  CREATE INDEX "_wedding_settings_v_created_at_idx" ON "_wedding_settings_v" USING btree ("created_at");
  CREATE INDEX "_wedding_settings_v_updated_at_idx" ON "_wedding_settings_v" USING btree ("updated_at");
  CREATE INDEX "_wedding_settings_v_latest_idx" ON "_wedding_settings_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "wedding_settings" CASCADE;
  DROP TABLE "_wedding_settings_v" CASCADE;
  DROP TYPE "public"."enum_wedding_settings_status";
  DROP TYPE "public"."enum__wedding_settings_v_version_status";`)
}
