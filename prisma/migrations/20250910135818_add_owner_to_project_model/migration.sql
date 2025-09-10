/*
  Warnings:

  - The values [OWNER] on the enum `ProjectRole` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `ownerId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ProjectRole_new" AS ENUM ('ADMIN', 'MEMBER', 'VIEWER');
ALTER TABLE "public"."ProjectMember" ALTER COLUMN "role" TYPE "public"."ProjectRole_new" USING ("role"::text::"public"."ProjectRole_new");
ALTER TYPE "public"."ProjectRole" RENAME TO "ProjectRole_old";
ALTER TYPE "public"."ProjectRole_new" RENAME TO "ProjectRole";
DROP TYPE "public"."ProjectRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
