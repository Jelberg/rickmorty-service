/*
  Warnings:

  - You are about to drop the column `ec_fc_time` on the `EPIS_CHAR` table. All the data in the column will be lost.
  - Added the required column `ec_fk_time` to the `EPIS_CHAR` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EPIS_CHAR" DROP CONSTRAINT "EPIS_CHAR_ec_fc_time_fkey";

-- AlterTable
ALTER TABLE "EPIS_CHAR" DROP COLUMN "ec_fc_time",
ADD COLUMN     "ec_fk_time" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "EPIS_CHAR" ADD CONSTRAINT "EPIS_CHAR_ec_fk_time_fkey" FOREIGN KEY ("ec_fk_time") REFERENCES "TIMES"("time_id") ON DELETE RESTRICT ON UPDATE CASCADE;
