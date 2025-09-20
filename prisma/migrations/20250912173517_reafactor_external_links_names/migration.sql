/*
  Warnings:

  - You are about to drop the column `githubUrl` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "githubUrl",
DROP COLUMN "linkedinUrl",
ADD COLUMN     "githubUsername" TEXT,
ADD COLUMN     "linkedinUsername" TEXT;
