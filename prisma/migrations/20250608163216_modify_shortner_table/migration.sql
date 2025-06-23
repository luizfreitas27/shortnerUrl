/*
  Warnings:

  - You are about to drop the `ShortnerUrl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShortnerUrl" DROP CONSTRAINT "ShortnerUrl_userId_fkey";

-- DropTable
DROP TABLE "ShortnerUrl";

-- CreateTable
CREATE TABLE "shortnerUrl_table" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortnerUrl" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "shortnerUrl_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortnerUrl_table_originalUrl_key" ON "shortnerUrl_table"("originalUrl");

-- AddForeignKey
ALTER TABLE "shortnerUrl_table" ADD CONSTRAINT "shortnerUrl_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
