/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `shortnerUrl_table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `shortnerUrl_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shortnerUrl_table" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shortnerUrl_table_code_key" ON "shortnerUrl_table"("code");
