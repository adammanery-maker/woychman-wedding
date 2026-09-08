import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__media_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_media_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_decorative" boolean DEFAULT false,
  	"version_alt" varchar,
  	"version_caption" varchar,
  	"version_credit" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__media_v_version_status" DEFAULT 'draft',
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"version_sizes_sm_url" varchar,
  	"version_sizes_sm_width" numeric,
  	"version_sizes_sm_height" numeric,
  	"version_sizes_sm_mime_type" varchar,
  	"version_sizes_sm_filesize" numeric,
  	"version_sizes_sm_filename" varchar,
  	"version_sizes_md_url" varchar,
  	"version_sizes_md_width" numeric,
  	"version_sizes_md_height" numeric,
  	"version_sizes_md_mime_type" varchar,
  	"version_sizes_md_filesize" numeric,
  	"version_sizes_md_filename" varchar,
  	"version_sizes_lg_url" varchar,
  	"version_sizes_lg_width" numeric,
  	"version_sizes_lg_height" numeric,
  	"version_sizes_lg_mime_type" varchar,
  	"version_sizes_lg_filesize" numeric,
  	"version_sizes_lg_filename" varchar,
  	"version_sizes_xl_url" varchar,
  	"version_sizes_xl_width" numeric,
  	"version_sizes_xl_height" numeric,
  	"version_sizes_xl_mime_type" varchar,
  	"version_sizes_xl_filesize" numeric,
  	"version_sizes_xl_filename" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "media" ADD COLUMN "_status" "enum_media_status" DEFAULT 'draft';
  UPDATE "media" SET "_status" = 'published';
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_media_v_parent_idx" ON "_media_v" USING btree ("parent_id");
  CREATE INDEX "_media_v_version_version_updated_at_idx" ON "_media_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_v_version_version_created_at_idx" ON "_media_v" USING btree ("version_created_at");
  CREATE INDEX "_media_v_version_version__status_idx" ON "_media_v" USING btree ("version__status");
  CREATE INDEX "_media_v_version_version_filename_idx" ON "_media_v" USING btree ("version_filename");
  CREATE INDEX "_media_v_version_sizes_sm_version_sizes_sm_filename_idx" ON "_media_v" USING btree ("version_sizes_sm_filename");
  CREATE INDEX "_media_v_version_sizes_md_version_sizes_md_filename_idx" ON "_media_v" USING btree ("version_sizes_md_filename");
  CREATE INDEX "_media_v_version_sizes_lg_version_sizes_lg_filename_idx" ON "_media_v" USING btree ("version_sizes_lg_filename");
  CREATE INDEX "_media_v_version_sizes_xl_version_sizes_xl_filename_idx" ON "_media_v" USING btree ("version_sizes_xl_filename");
  CREATE INDEX "_media_v_created_at_idx" ON "_media_v" USING btree ("created_at");
  CREATE INDEX "_media_v_updated_at_idx" ON "_media_v" USING btree ("updated_at");
  CREATE INDEX "_media_v_latest_idx" ON "_media_v" USING btree ("latest");
  CREATE INDEX "media__status_idx" ON "media" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_media_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_media_v" CASCADE;
  DROP INDEX "media__status_idx";
  ALTER TABLE "media" DROP COLUMN "_status";
  DROP TYPE "public"."enum_media_status";
  DROP TYPE "public"."enum__media_v_version_status";`)
}
