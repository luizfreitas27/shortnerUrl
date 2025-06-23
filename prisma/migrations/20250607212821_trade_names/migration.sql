/*
  Warnings:

  - You are about to drop the `shortnerUrl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "shortnerUrl" DROP CONSTRAINT "shortnerUrl_userId_fkey";

-- DropTable
DROP TABLE "shortnerUrl";

-- CreateTable
CREATE TABLE "ShortnerUrl" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortnerUrl" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ShortnerUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortnerUrl_originalUrl_key" ON "ShortnerUrl"("originalUrl");

-- AddForeignKey
ALTER TABLE "ShortnerUrl" ADD CONSTRAINT "ShortnerUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
