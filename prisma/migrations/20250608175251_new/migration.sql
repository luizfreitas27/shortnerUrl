/*
  Warnings:

  - A unique constraint covering the columns `[shortnerUrl]` on the table `shortnerUrl_table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shortnerUrl_table_shortnerUrl_key" ON "shortnerUrl_table"("shortnerUrl");
