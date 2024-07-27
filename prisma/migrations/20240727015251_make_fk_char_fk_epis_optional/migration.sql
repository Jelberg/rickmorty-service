/*
  Warnings:

  - You are about to drop the column `specie` on the `characters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subc_char_epis" DROP CONSTRAINT "subc_char_epis_fk_char_fkey";

-- DropForeignKey
ALTER TABLE "subc_char_epis" DROP CONSTRAINT "subc_char_epis_fk_epis_fkey";

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "specie";

-- AlterTable
ALTER TABLE "subc_char_epis" ALTER COLUMN "fk_char" DROP NOT NULL,
ALTER COLUMN "fk_epis" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "subc_char_epis" ADD CONSTRAINT "subc_char_epis_fk_char_fkey" FOREIGN KEY ("fk_char") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subc_char_epis" ADD CONSTRAINT "subc_char_epis_fk_epis_fkey" FOREIGN KEY ("fk_epis") REFERENCES "episodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
