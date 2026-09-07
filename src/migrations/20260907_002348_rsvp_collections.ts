import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_guest_responses_attendance" AS ENUM('pending', 'attending', 'not attending');
  CREATE TABLE "households" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"display_name" varchar NOT NULL,
  	"invitation_code" varchar NOT NULL,
  	"contact_email" varchar,
  	"active" boolean DEFAULT true,
  	"admin_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "guests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"household_id" integer NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"display_name" varchar,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "guest_responses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"guest_id" integer NOT NULL,
  	"attendance" "enum_guest_responses_attendance" DEFAULT 'pending' NOT NULL,
  	"dietary_restrictions" varchar,
  	"accessibility_requirements" varchar,
  	"responded_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "households_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "guests_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "guest_responses_id" integer;
  ALTER TABLE "guests" ADD CONSTRAINT "guests_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guest_responses" ADD CONSTRAINT "guest_responses_guest_id_guests_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."guests"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "households_invitation_code_idx" ON "households" USING btree ("invitation_code");
  CREATE INDEX "households_updated_at_idx" ON "households" USING btree ("updated_at");
  CREATE INDEX "households_created_at_idx" ON "households" USING btree ("created_at");
  CREATE INDEX "guests_household_idx" ON "guests" USING btree ("household_id");
  CREATE INDEX "guests_updated_at_idx" ON "guests" USING btree ("updated_at");
  CREATE INDEX "guests_created_at_idx" ON "guests" USING btree ("created_at");
  CREATE UNIQUE INDEX "guest_responses_guest_idx" ON "guest_responses" USING btree ("guest_id");
  CREATE INDEX "guest_responses_updated_at_idx" ON "guest_responses" USING btree ("updated_at");
  CREATE INDEX "guest_responses_created_at_idx" ON "guest_responses" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_households_fk" FOREIGN KEY ("households_id") REFERENCES "public"."households"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guests_fk" FOREIGN KEY ("guests_id") REFERENCES "public"."guests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guest_responses_fk" FOREIGN KEY ("guest_responses_id") REFERENCES "public"."guest_responses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_households_id_idx" ON "payload_locked_documents_rels" USING btree ("households_id");
  CREATE INDEX "payload_locked_documents_rels_guests_id_idx" ON "payload_locked_documents_rels" USING btree ("guests_id");
  CREATE INDEX "payload_locked_documents_rels_guest_responses_id_idx" ON "payload_locked_documents_rels" USING btree ("guest_responses_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "households" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "guests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "guest_responses" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "households" CASCADE;
  DROP TABLE "guests" CASCADE;
  DROP TABLE "guest_responses" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_households_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_guests_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_guest_responses_fk";
  
  DROP INDEX "payload_locked_documents_rels_households_id_idx";
  DROP INDEX "payload_locked_documents_rels_guests_id_idx";
  DROP INDEX "payload_locked_documents_rels_guest_responses_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "households_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "guests_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "guest_responses_id";
  DROP TYPE "public"."enum_guest_responses_attendance";`)
}
