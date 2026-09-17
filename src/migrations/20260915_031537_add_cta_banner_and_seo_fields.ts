import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_robots" AS ENUM('index-follow', 'noindex-follow', 'index-nofollow', 'noindex-nofollow');
  ALTER TABLE "posts" ADD COLUMN "canonical" varchar;
  ALTER TABLE "posts" ADD COLUMN "robots" "enum_posts_robots" DEFAULT 'index-follow';`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "canonical";
  ALTER TABLE "posts" DROP COLUMN "robots";
  DROP TYPE "public"."enum_posts_robots";`)
}
