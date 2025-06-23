/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `shortnerUrl_table` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `shortnerUrl_table` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `shortnerUrl_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shortnerUrl_table" DROP COLUMN "CreatedAt",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
