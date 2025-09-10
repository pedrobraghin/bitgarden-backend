-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repositoryUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "Stack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProjectStack" (
    "projectId" TEXT NOT NULL,
    "stackId" TEXT NOT NULL,

    CONSTRAINT "ProjectStack_pkey" PRIMARY KEY ("projectId","stackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stack_name_key" ON "public"."Stack"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stack_slug_key" ON "public"."Stack"("slug");

-- AddForeignKey
ALTER TABLE "public"."ProjectStack" ADD CONSTRAINT "ProjectStack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectStack" ADD CONSTRAINT "ProjectStack_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "public"."Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
