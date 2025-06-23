-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "users_table" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
