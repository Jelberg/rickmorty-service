/*
  Warnings:

  - The primary key for the `CATEGORIES` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cate_id` on the `CATEGORIES` table. All the data in the column will be lost.
  - You are about to drop the column `cate_name` on the `CATEGORIES` table. All the data in the column will be lost.
  - The primary key for the `CHARACTERS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `char_fk_typestat` on the `CHARACTERS` table. All the data in the column will be lost.
  - You are about to drop the column `char_id` on the `CHARACTERS` table. All the data in the column will be lost.
  - You are about to drop the column `char_name` on the `CHARACTERS` table. All the data in the column will be lost.
  - The primary key for the `EPISODES` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `epis_duration` on the `EPISODES` table. All the data in the column will be lost.
  - You are about to drop the column `epis_fk_typestat` on the `EPISODES` table. All the data in the column will be lost.
  - You are about to drop the column `epis_id` on the `EPISODES` table. All the data in the column will be lost.
  - The primary key for the `EPIS_CHAR` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ec_duration` on the `EPIS_CHAR` table. All the data in the column will be lost.
  - You are about to drop the column `ec_fk_char` on the `EPIS_CHAR` table. All the data in the column will be lost.
  - You are about to drop the column `ec_fk_epis` on the `EPIS_CHAR` table. All the data in the column will be lost.
  - You are about to drop the column `ec_fk_time` on the `EPIS_CHAR` table. All the data in the column will be lost.
  - You are about to drop the column `ec_id` on the `EPIS_CHAR` table. All the data in the column will be lost.
  - The primary key for the `STATUS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stat_id` on the `STATUS` table. All the data in the column will be lost.
  - You are about to drop the column `stat_name` on the `STATUS` table. All the data in the column will be lost.
  - The primary key for the `SUBCATEGORIES` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subc_fk_cate` on the `SUBCATEGORIES` table. All the data in the column will be lost.
  - You are about to drop the column `subc_id` on the `SUBCATEGORIES` table. All the data in the column will be lost.
  - You are about to drop the column `subc_name` on the `SUBCATEGORIES` table. All the data in the column will be lost.
  - The primary key for the `SUBC_CHAR_EPIS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sce_fk_char` on the `SUBC_CHAR_EPIS` table. All the data in the column will be lost.
  - You are about to drop the column `sce_fk_epis` on the `SUBC_CHAR_EPIS` table. All the data in the column will be lost.
  - You are about to drop the column `sce_fk_subc` on the `SUBC_CHAR_EPIS` table. All the data in the column will be lost.
  - You are about to drop the column `sce_id` on the `SUBC_CHAR_EPIS` table. All the data in the column will be lost.
  - The primary key for the `TIMES` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `time_finish` on the `TIMES` table. All the data in the column will be lost.
  - You are about to drop the column `time_id` on the `TIMES` table. All the data in the column will be lost.
  - You are about to drop the column `time_init` on the `TIMES` table. All the data in the column will be lost.
  - The primary key for the `TYPES` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type_id` on the `TYPES` table. All the data in the column will be lost.
  - You are about to drop the column `type_name` on the `TYPES` table. All the data in the column will be lost.
  - The primary key for the `TYPE_STAT` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ts_fk_state` on the `TYPE_STAT` table. All the data in the column will be lost.
  - You are about to drop the column `ts_fk_type` on the `TYPE_STAT` table. All the data in the column will be lost.
  - You are about to drop the column `ts_id` on the `TYPE_STAT` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fk_char,fk_subc,fk_epis]` on the table `SUBC_CHAR_EPIS` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `CATEGORIES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_typestat` to the `CHARACTERS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CHARACTERS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `EPISODES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episode` to the `EPISODES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_typestat` to the `EPISODES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `EPISODES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `EPIS_CHAR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_char` to the `EPIS_CHAR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_epis` to the `EPIS_CHAR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_time` to the `EPIS_CHAR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `STATUS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_cate` to the `SUBCATEGORIES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SUBCATEGORIES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_char` to the `SUBC_CHAR_EPIS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_epis` to the `SUBC_CHAR_EPIS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_subc` to the `SUBC_CHAR_EPIS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finish` to the `TIMES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `init` to the `TIMES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TYPES` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_state` to the `TYPE_STAT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_type` to the `TYPE_STAT` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CHARACTERS" DROP CONSTRAINT "CHARACTERS_char_fk_typestat_fkey";

-- DropForeignKey
ALTER TABLE "EPISODES" DROP CONSTRAINT "EPISODES_epis_fk_typestat_fkey";

-- DropForeignKey
ALTER TABLE "EPIS_CHAR" DROP CONSTRAINT "EPIS_CHAR_ec_fk_char_fkey";

-- DropForeignKey
ALTER TABLE "EPIS_CHAR" DROP CONSTRAINT "EPIS_CHAR_ec_fk_epis_fkey";

-- DropForeignKey
ALTER TABLE "EPIS_CHAR" DROP CONSTRAINT "EPIS_CHAR_ec_fk_time_fkey";

-- DropForeignKey
ALTER TABLE "SUBCATEGORIES" DROP CONSTRAINT "SUBCATEGORIES_subc_fk_cate_fkey";

-- DropForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" DROP CONSTRAINT "SUBC_CHAR_EPIS_sce_fk_char_fkey";

-- DropForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" DROP CONSTRAINT "SUBC_CHAR_EPIS_sce_fk_epis_fkey";

-- DropForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" DROP CONSTRAINT "SUBC_CHAR_EPIS_sce_fk_subc_fkey";

-- DropForeignKey
ALTER TABLE "TYPE_STAT" DROP CONSTRAINT "TYPE_STAT_ts_fk_state_fkey";

-- DropForeignKey
ALTER TABLE "TYPE_STAT" DROP CONSTRAINT "TYPE_STAT_ts_fk_type_fkey";

-- DropIndex
DROP INDEX "SUBC_CHAR_EPIS_sce_fk_char_sce_fk_subc_sce_fk_epis_key";

-- AlterTable
ALTER TABLE "CATEGORIES" DROP CONSTRAINT "CATEGORIES_pkey",
DROP COLUMN "cate_id",
DROP COLUMN "cate_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "CATEGORIES_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CHARACTERS" DROP CONSTRAINT "CHARACTERS_pkey",
DROP COLUMN "char_fk_typestat",
DROP COLUMN "char_id",
DROP COLUMN "char_name",
ADD COLUMN     "fk_typestat" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "CHARACTERS_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EPISODES" DROP CONSTRAINT "EPISODES_pkey",
DROP COLUMN "epis_duration",
DROP COLUMN "epis_fk_typestat",
DROP COLUMN "epis_id",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "episode" TEXT NOT NULL,
ADD COLUMN     "fk_typestat" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "EPISODES_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EPIS_CHAR" DROP CONSTRAINT "EPIS_CHAR_pkey",
DROP COLUMN "ec_duration",
DROP COLUMN "ec_fk_char",
DROP COLUMN "ec_fk_epis",
DROP COLUMN "ec_fk_time",
DROP COLUMN "ec_id",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "fk_char" INTEGER NOT NULL,
ADD COLUMN     "fk_epis" INTEGER NOT NULL,
ADD COLUMN     "fk_time" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EPIS_CHAR_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "STATUS" DROP CONSTRAINT "STATUS_pkey",
DROP COLUMN "stat_id",
DROP COLUMN "stat_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "STATUS_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SUBCATEGORIES" DROP CONSTRAINT "SUBCATEGORIES_pkey",
DROP COLUMN "subc_fk_cate",
DROP COLUMN "subc_id",
DROP COLUMN "subc_name",
ADD COLUMN     "fk_cate" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "SUBCATEGORIES_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SUBC_CHAR_EPIS" DROP CONSTRAINT "SUBC_CHAR_EPIS_pkey",
DROP COLUMN "sce_fk_char",
DROP COLUMN "sce_fk_epis",
DROP COLUMN "sce_fk_subc",
DROP COLUMN "sce_id",
ADD COLUMN     "fk_char" INTEGER NOT NULL,
ADD COLUMN     "fk_epis" INTEGER NOT NULL,
ADD COLUMN     "fk_subc" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SUBC_CHAR_EPIS_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TIMES" DROP CONSTRAINT "TIMES_pkey",
DROP COLUMN "time_finish",
DROP COLUMN "time_id",
DROP COLUMN "time_init",
ADD COLUMN     "finish" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "init" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "TIMES_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TYPES" DROP CONSTRAINT "TYPES_pkey",
DROP COLUMN "type_id",
DROP COLUMN "type_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "TYPES_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TYPE_STAT" DROP CONSTRAINT "TYPE_STAT_pkey",
DROP COLUMN "ts_fk_state",
DROP COLUMN "ts_fk_type",
DROP COLUMN "ts_id",
ADD COLUMN     "fk_state" INTEGER NOT NULL,
ADD COLUMN     "fk_type" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TYPE_STAT_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "SUBC_CHAR_EPIS_fk_char_fk_subc_fk_epis_key" ON "SUBC_CHAR_EPIS"("fk_char", "fk_subc", "fk_epis");

-- AddForeignKey
ALTER TABLE "TYPE_STAT" ADD CONSTRAINT "TYPE_STAT_fk_type_fkey" FOREIGN KEY ("fk_type") REFERENCES "TYPES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TYPE_STAT" ADD CONSTRAINT "TYPE_STAT_fk_state_fkey" FOREIGN KEY ("fk_state") REFERENCES "STATUS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CHARACTERS" ADD CONSTRAINT "CHARACTERS_fk_typestat_fkey" FOREIGN KEY ("fk_typestat") REFERENCES "TYPE_STAT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPISODES" ADD CONSTRAINT "EPISODES_fk_typestat_fkey" FOREIGN KEY ("fk_typestat") REFERENCES "TYPE_STAT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SUBCATEGORIES" ADD CONSTRAINT "SUBCATEGORIES_fk_cate_fkey" FOREIGN KEY ("fk_cate") REFERENCES "CATEGORIES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPIS_CHAR" ADD CONSTRAINT "EPIS_CHAR_fk_char_fkey" FOREIGN KEY ("fk_char") REFERENCES "CHARACTERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPIS_CHAR" ADD CONSTRAINT "EPIS_CHAR_fk_epis_fkey" FOREIGN KEY ("fk_epis") REFERENCES "EPISODES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPIS_CHAR" ADD CONSTRAINT "EPIS_CHAR_fk_time_fkey" FOREIGN KEY ("fk_time") REFERENCES "TIMES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" ADD CONSTRAINT "SUBC_CHAR_EPIS_fk_char_fkey" FOREIGN KEY ("fk_char") REFERENCES "CHARACTERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" ADD CONSTRAINT "SUBC_CHAR_EPIS_fk_subc_fkey" FOREIGN KEY ("fk_subc") REFERENCES "SUBCATEGORIES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" ADD CONSTRAINT "SUBC_CHAR_EPIS_fk_epis_fkey" FOREIGN KEY ("fk_epis") REFERENCES "EPISODES"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
