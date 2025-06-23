/*
  Warnings:

  - A unique constraint covering the columns `[originalUrl,userId]` on the table `shortnerUrl_table` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "shortnerUrl_table_originalUrl_key";

-- CreateIndex
CREATE UNIQUE INDEX "shortnerUrl_table_originalUrl_userId_key" ON "shortnerUrl_table"("originalUrl", "userId");
