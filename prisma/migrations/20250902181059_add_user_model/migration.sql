-- CreateTable
CREATE TABLE "public"."User" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "public"."User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
