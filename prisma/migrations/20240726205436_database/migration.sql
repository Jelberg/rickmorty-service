/*
  Warnings:

  - Added the required column `specie` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "characters" ADD COLUMN     "specie" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "times" ALTER COLUMN "init" SET DATA TYPE TEXT,
ALTER COLUMN "finish" SET DATA TYPE TEXT;
