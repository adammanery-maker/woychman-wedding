import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_accommodations_best_for" AS ENUM('couples', 'solo travellers', 'groups of four', 'groups of six');
  CREATE TYPE "public"."enum_accommodations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__accommodations_v_version_best_for" AS ENUM('couples', 'solo travellers', 'groups of four', 'groups of six');
  CREATE TYPE "public"."enum__accommodations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_registries_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__registries_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_homepage_primary_action" AS ENUM('rsvp', 'weekend', 'travel', 'custom');
  CREATE TYPE "public"."enum_homepage_secondary_action" AS ENUM('none', 'weekend', 'travel');
  CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_version_primary_action" AS ENUM('rsvp', 'weekend', 'travel', 'custom');
  CREATE TYPE "public"."enum__homepage_v_version_secondary_action" AS ENUM('none', 'weekend', 'travel');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_travel_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__travel_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_faq_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faq_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_story_page_layout" AS ENUM('standard', 'image-left', 'image-right', 'full-width');
  CREATE TYPE "public"."enum_story_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__story_page_v_version_layout" AS ENUM('standard', 'image-left', 'image-right', 'full-width');
  CREATE TYPE "public"."enum__story_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_registry_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__registry_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_announcement_tone" AS ENUM('information', 'important');
  CREATE TYPE "public"."enum_announcement_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__announcement_v_version_tone" AS ENUM('information', 'important');
  CREATE TYPE "public"."enum__announcement_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "accommodations_best_for" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_accommodations_best_for",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accommodations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"property_u_r_l" varchar,
  	"booking_u_r_l" varchar,
  	"short_description" varchar,
  	"location" varchar,
  	"distance_from_venue" varchar,
  	"approximate_travel_time" varchar,
  	"price_range" varchar,
  	"room_information" varchar,
  	"booking_deadline" timestamp(3) with time zone,
  	"booking_code" varchar,
  	"parking_information" varchar,
  	"check_in" timestamp(3) with time zone,
  	"check_out" timestamp(3) with time zone,
  	"active" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_accommodations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_accommodations_v_version_best_for" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__accommodations_v_version_best_for",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_accommodations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_property_u_r_l" varchar,
  	"version_booking_u_r_l" varchar,
  	"version_short_description" varchar,
  	"version_location" varchar,
  	"version_distance_from_venue" varchar,
  	"version_approximate_travel_time" varchar,
  	"version_price_range" varchar,
  	"version_room_information" varchar,
  	"version_booking_deadline" timestamp(3) with time zone,
  	"version_booking_code" varchar,
  	"version_parking_information" varchar,
  	"version_check_in" timestamp(3) with time zone,
  	"version_check_out" timestamp(3) with time zone,
  	"version_active" boolean DEFAULT true,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__accommodations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"category" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faqs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar,
  	"version_answer" jsonb,
  	"version_category" varchar,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faqs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "registries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"url" varchar,
  	"short_description" varchar,
  	"image_id" integer,
  	"active" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_registries_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_registries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_url" varchar,
  	"version_short_description" varchar,
  	"version_image_id" integer,
  	"version_active" boolean DEFAULT true,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__registries_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"eyebrow" varchar,
  	"welcome_heading" varchar,
  	"introduction" varchar,
  	"primary_action" "enum_homepage_primary_action" DEFAULT 'weekend',
  	"custom_action_label" varchar,
  	"custom_action_u_r_l" varchar,
  	"secondary_action" "enum_homepage_secondary_action",
  	"_status" "enum_homepage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_eyebrow" varchar,
  	"version_welcome_heading" varchar,
  	"version_introduction" varchar,
  	"version_primary_action" "enum__homepage_v_version_primary_action" DEFAULT 'weekend',
  	"version_custom_action_label" varchar,
  	"version_custom_action_u_r_l" varchar,
  	"version_secondary_action" "enum__homepage_v_version_secondary_action",
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "travel_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"introduction" jsonb,
  	"getting_to_canmore" jsonb,
  	"wedding_transportation" jsonb,
  	"parking" jsonb,
  	"weather_guidance" jsonb,
  	"local_notes" jsonb,
  	"_status" "enum_travel_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_travel_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_introduction" jsonb,
  	"version_getting_to_canmore" jsonb,
  	"version_wedding_transportation" jsonb,
  	"version_parking" jsonb,
  	"version_weather_guidance" jsonb,
  	"version_local_notes" jsonb,
  	"version__status" "enum__travel_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "faq_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"introduction" varchar,
  	"_status" "enum_faq_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_faq_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_introduction" varchar,
  	"version__status" "enum__faq_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "story_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"title" varchar,
  	"introduction" varchar,
  	"body" jsonb,
  	"layout" "enum_story_page_layout" DEFAULT 'standard',
  	"_status" "enum_story_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "story_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_story_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_enabled" boolean DEFAULT false,
  	"version_title" varchar,
  	"version_introduction" varchar,
  	"version_body" jsonb,
  	"version_layout" "enum__story_page_v_version_layout" DEFAULT 'standard',
  	"version__status" "enum__story_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_story_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "registry_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"introduction" varchar,
  	"_status" "enum_registry_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_registry_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_introduction" varchar,
  	"version__status" "enum__registry_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "announcement" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"message" varchar,
  	"link_label" varchar,
  	"link_u_r_l" varchar,
  	"tone" "enum_announcement_tone" DEFAULT 'information',
  	"_status" "enum_announcement_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_announcement_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_enabled" boolean DEFAULT false,
  	"version_message" varchar,
  	"version_link_label" varchar,
  	"version_link_u_r_l" varchar,
  	"version_tone" "enum__announcement_v_version_tone" DEFAULT 'information',
  	"version__status" "enum__announcement_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "accommodations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "registries_id" integer;
  ALTER TABLE "accommodations_best_for" ADD CONSTRAINT "accommodations_best_for_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accommodations_v_version_best_for" ADD CONSTRAINT "_accommodations_v_version_best_for_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_accommodations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accommodations_v" ADD CONSTRAINT "_accommodations_v_parent_id_accommodations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accommodations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "registries" ADD CONSTRAINT "registries_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_registries_v" ADD CONSTRAINT "_registries_v_parent_id_registries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."registries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_registries_v" ADD CONSTRAINT "_registries_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "story_page_rels" ADD CONSTRAINT "story_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."story_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "story_page_rels" ADD CONSTRAINT "story_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_story_page_v_rels" ADD CONSTRAINT "_story_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_story_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_story_page_v_rels" ADD CONSTRAINT "_story_page_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accommodations_best_for_order_idx" ON "accommodations_best_for" USING btree ("order");
  CREATE INDEX "accommodations_best_for_parent_idx" ON "accommodations_best_for" USING btree ("parent_id");
  CREATE INDEX "accommodations_updated_at_idx" ON "accommodations" USING btree ("updated_at");
  CREATE INDEX "accommodations_created_at_idx" ON "accommodations" USING btree ("created_at");
  CREATE INDEX "accommodations__status_idx" ON "accommodations" USING btree ("_status");
  CREATE INDEX "_accommodations_v_version_best_for_order_idx" ON "_accommodations_v_version_best_for" USING btree ("order");
  CREATE INDEX "_accommodations_v_version_best_for_parent_idx" ON "_accommodations_v_version_best_for" USING btree ("parent_id");
  CREATE INDEX "_accommodations_v_parent_idx" ON "_accommodations_v" USING btree ("parent_id");
  CREATE INDEX "_accommodations_v_version_version_updated_at_idx" ON "_accommodations_v" USING btree ("version_updated_at");
  CREATE INDEX "_accommodations_v_version_version_created_at_idx" ON "_accommodations_v" USING btree ("version_created_at");
  CREATE INDEX "_accommodations_v_version_version__status_idx" ON "_accommodations_v" USING btree ("version__status");
  CREATE INDEX "_accommodations_v_created_at_idx" ON "_accommodations_v" USING btree ("created_at");
  CREATE INDEX "_accommodations_v_updated_at_idx" ON "_accommodations_v" USING btree ("updated_at");
  CREATE INDEX "_accommodations_v_latest_idx" ON "_accommodations_v" USING btree ("latest");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "faqs" USING btree ("_status");
  CREATE INDEX "_faqs_v_parent_idx" ON "_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_latest_idx" ON "_faqs_v" USING btree ("latest");
  CREATE INDEX "registries_image_idx" ON "registries" USING btree ("image_id");
  CREATE INDEX "registries_updated_at_idx" ON "registries" USING btree ("updated_at");
  CREATE INDEX "registries_created_at_idx" ON "registries" USING btree ("created_at");
  CREATE INDEX "registries__status_idx" ON "registries" USING btree ("_status");
  CREATE INDEX "_registries_v_parent_idx" ON "_registries_v" USING btree ("parent_id");
  CREATE INDEX "_registries_v_version_version_image_idx" ON "_registries_v" USING btree ("version_image_id");
  CREATE INDEX "_registries_v_version_version_updated_at_idx" ON "_registries_v" USING btree ("version_updated_at");
  CREATE INDEX "_registries_v_version_version_created_at_idx" ON "_registries_v" USING btree ("version_created_at");
  CREATE INDEX "_registries_v_version_version__status_idx" ON "_registries_v" USING btree ("version__status");
  CREATE INDEX "_registries_v_created_at_idx" ON "_registries_v" USING btree ("created_at");
  CREATE INDEX "_registries_v_updated_at_idx" ON "_registries_v" USING btree ("updated_at");
  CREATE INDEX "_registries_v_latest_idx" ON "_registries_v" USING btree ("latest");
  CREATE INDEX "homepage_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE INDEX "_homepage_v_version_version_hero_image_idx" ON "_homepage_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");
  CREATE INDEX "travel_page__status_idx" ON "travel_page" USING btree ("_status");
  CREATE INDEX "_travel_page_v_version_version__status_idx" ON "_travel_page_v" USING btree ("version__status");
  CREATE INDEX "_travel_page_v_created_at_idx" ON "_travel_page_v" USING btree ("created_at");
  CREATE INDEX "_travel_page_v_updated_at_idx" ON "_travel_page_v" USING btree ("updated_at");
  CREATE INDEX "_travel_page_v_latest_idx" ON "_travel_page_v" USING btree ("latest");
  CREATE INDEX "faq_page__status_idx" ON "faq_page" USING btree ("_status");
  CREATE INDEX "_faq_page_v_version_version__status_idx" ON "_faq_page_v" USING btree ("version__status");
  CREATE INDEX "_faq_page_v_created_at_idx" ON "_faq_page_v" USING btree ("created_at");
  CREATE INDEX "_faq_page_v_updated_at_idx" ON "_faq_page_v" USING btree ("updated_at");
  CREATE INDEX "_faq_page_v_latest_idx" ON "_faq_page_v" USING btree ("latest");
  CREATE INDEX "story_page__status_idx" ON "story_page" USING btree ("_status");
  CREATE INDEX "story_page_rels_order_idx" ON "story_page_rels" USING btree ("order");
  CREATE INDEX "story_page_rels_parent_idx" ON "story_page_rels" USING btree ("parent_id");
  CREATE INDEX "story_page_rels_path_idx" ON "story_page_rels" USING btree ("path");
  CREATE INDEX "story_page_rels_media_id_idx" ON "story_page_rels" USING btree ("media_id");
  CREATE INDEX "_story_page_v_version_version__status_idx" ON "_story_page_v" USING btree ("version__status");
  CREATE INDEX "_story_page_v_created_at_idx" ON "_story_page_v" USING btree ("created_at");
  CREATE INDEX "_story_page_v_updated_at_idx" ON "_story_page_v" USING btree ("updated_at");
  CREATE INDEX "_story_page_v_latest_idx" ON "_story_page_v" USING btree ("latest");
  CREATE INDEX "_story_page_v_rels_order_idx" ON "_story_page_v_rels" USING btree ("order");
  CREATE INDEX "_story_page_v_rels_parent_idx" ON "_story_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_story_page_v_rels_path_idx" ON "_story_page_v_rels" USING btree ("path");
  CREATE INDEX "_story_page_v_rels_media_id_idx" ON "_story_page_v_rels" USING btree ("media_id");
  CREATE INDEX "registry_page__status_idx" ON "registry_page" USING btree ("_status");
  CREATE INDEX "_registry_page_v_version_version__status_idx" ON "_registry_page_v" USING btree ("version__status");
  CREATE INDEX "_registry_page_v_created_at_idx" ON "_registry_page_v" USING btree ("created_at");
  CREATE INDEX "_registry_page_v_updated_at_idx" ON "_registry_page_v" USING btree ("updated_at");
  CREATE INDEX "_registry_page_v_latest_idx" ON "_registry_page_v" USING btree ("latest");
  CREATE INDEX "announcement__status_idx" ON "announcement" USING btree ("_status");
  CREATE INDEX "_announcement_v_version_version__status_idx" ON "_announcement_v" USING btree ("version__status");
  CREATE INDEX "_announcement_v_created_at_idx" ON "_announcement_v" USING btree ("created_at");
  CREATE INDEX "_announcement_v_updated_at_idx" ON "_announcement_v" USING btree ("updated_at");
  CREATE INDEX "_announcement_v_latest_idx" ON "_announcement_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accommodations_fk" FOREIGN KEY ("accommodations_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_registries_fk" FOREIGN KEY ("registries_id") REFERENCES "public"."registries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_accommodations_id_idx" ON "payload_locked_documents_rels" USING btree ("accommodations_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_registries_id_idx" ON "payload_locked_documents_rels" USING btree ("registries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accommodations_best_for" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accommodations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_accommodations_v_version_best_for" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_accommodations_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faqs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "registries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_registries_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "travel_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_travel_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faq_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "story_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "story_page_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_story_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_story_page_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "registry_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_registry_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_announcement_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "accommodations_best_for" CASCADE;
  DROP TABLE "accommodations" CASCADE;
  DROP TABLE "_accommodations_v_version_best_for" CASCADE;
  DROP TABLE "_accommodations_v" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "_faqs_v" CASCADE;
  DROP TABLE "registries" CASCADE;
  DROP TABLE "_registries_v" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "_homepage_v" CASCADE;
  DROP TABLE "travel_page" CASCADE;
  DROP TABLE "_travel_page_v" CASCADE;
  DROP TABLE "faq_page" CASCADE;
  DROP TABLE "_faq_page_v" CASCADE;
  DROP TABLE "story_page" CASCADE;
  DROP TABLE "story_page_rels" CASCADE;
  DROP TABLE "_story_page_v" CASCADE;
  DROP TABLE "_story_page_v_rels" CASCADE;
  DROP TABLE "registry_page" CASCADE;
  DROP TABLE "_registry_page_v" CASCADE;
  DROP TABLE "announcement" CASCADE;
  DROP TABLE "_announcement_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_accommodations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_registries_fk";
  
  DROP INDEX "payload_locked_documents_rels_accommodations_id_idx";
  DROP INDEX "payload_locked_documents_rels_faqs_id_idx";
  DROP INDEX "payload_locked_documents_rels_registries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "accommodations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "registries_id";
  DROP TYPE "public"."enum_accommodations_best_for";
  DROP TYPE "public"."enum_accommodations_status";
  DROP TYPE "public"."enum__accommodations_v_version_best_for";
  DROP TYPE "public"."enum__accommodations_v_version_status";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum__faqs_v_version_status";
  DROP TYPE "public"."enum_registries_status";
  DROP TYPE "public"."enum__registries_v_version_status";
  DROP TYPE "public"."enum_homepage_primary_action";
  DROP TYPE "public"."enum_homepage_secondary_action";
  DROP TYPE "public"."enum_homepage_status";
  DROP TYPE "public"."enum__homepage_v_version_primary_action";
  DROP TYPE "public"."enum__homepage_v_version_secondary_action";
  DROP TYPE "public"."enum__homepage_v_version_status";
  DROP TYPE "public"."enum_travel_page_status";
  DROP TYPE "public"."enum__travel_page_v_version_status";
  DROP TYPE "public"."enum_faq_page_status";
  DROP TYPE "public"."enum__faq_page_v_version_status";
  DROP TYPE "public"."enum_story_page_layout";
  DROP TYPE "public"."enum_story_page_status";
  DROP TYPE "public"."enum__story_page_v_version_layout";
  DROP TYPE "public"."enum__story_page_v_version_status";
  DROP TYPE "public"."enum_registry_page_status";
  DROP TYPE "public"."enum__registry_page_v_version_status";
  DROP TYPE "public"."enum_announcement_tone";
  DROP TYPE "public"."enum_announcement_status";
  DROP TYPE "public"."enum__announcement_v_version_tone";
  DROP TYPE "public"."enum__announcement_v_version_status";`)
}
