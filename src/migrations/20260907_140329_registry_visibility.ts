import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "registry_page" ADD COLUMN "enabled" boolean DEFAULT false;
  ALTER TABLE "_registry_page_v" ADD COLUMN "version_enabled" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "registry_page" DROP COLUMN "enabled";
  ALTER TABLE "_registry_page_v" DROP COLUMN "version_enabled";`)
}
