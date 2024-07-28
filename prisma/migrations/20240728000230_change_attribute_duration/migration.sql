/*
  Warnings:

  - Made the column `duration` on table `epis_char` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "epis_char" ALTER COLUMN "duration" SET NOT NULL;
