/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_provider_providerId_key" ON "public"."Profile"("provider", "providerId");
