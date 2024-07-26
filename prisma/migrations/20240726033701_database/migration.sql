/*
  Warnings:

  - You are about to drop the `CATEGORIES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CHARACTERS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EPISODES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EPIS_CHAR` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `STATUS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SUBCATEGORIES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SUBC_CHAR_EPIS` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TIMES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TYPES` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TYPE_STAT` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CHARACTERS" DROP CONSTRAINT "CHARACTERS_fk_typestat_fkey";

-- DropForeignKey
ALTER TABLE "EPISODES" DROP CONSTRAINT "EPISODES_fk_typestat_fkey";

-- DropForeignKey
ALTER TABLE "EPIS_CHAR" DROP CONSTRAINT "EPIS_CHAR_fk_char_fkey";

-- DropForeignKey
ALTER TABLE "EPIS_CHAR" DROP CONSTRAINT "EPIS_CHAR_fk_epis_fkey";

-- DropForeignKey
ALTER TABLE "EPIS_CHAR" DROP CONSTRAINT "EPIS_CHAR_fk_time_fkey";

-- DropForeignKey
ALTER TABLE "SUBCATEGORIES" DROP CONSTRAINT "SUBCATEGORIES_fk_cate_fkey";

-- DropForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" DROP CONSTRAINT "SUBC_CHAR_EPIS_fk_char_fkey";

-- DropForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" DROP CONSTRAINT "SUBC_CHAR_EPIS_fk_epis_fkey";

-- DropForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" DROP CONSTRAINT "SUBC_CHAR_EPIS_fk_subc_fkey";

-- DropForeignKey
ALTER TABLE "TYPE_STAT" DROP CONSTRAINT "TYPE_STAT_fk_state_fkey";

-- DropForeignKey
ALTER TABLE "TYPE_STAT" DROP CONSTRAINT "TYPE_STAT_fk_type_fkey";

-- DropTable
DROP TABLE "CATEGORIES";

-- DropTable
DROP TABLE "CHARACTERS";

-- DropTable
DROP TABLE "EPISODES";

-- DropTable
DROP TABLE "EPIS_CHAR";

-- DropTable
DROP TABLE "STATUS";

-- DropTable
DROP TABLE "SUBCATEGORIES";

-- DropTable
DROP TABLE "SUBC_CHAR_EPIS";

-- DropTable
DROP TABLE "TIMES";

-- DropTable
DROP TABLE "TYPES";

-- DropTable
DROP TABLE "TYPE_STAT";

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_stat" (
    "id" SERIAL NOT NULL,
    "fk_type" INTEGER NOT NULL,
    "fk_state" INTEGER NOT NULL,

    CONSTRAINT "type_stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "fk_typestat" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "fk_typestat" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "episode" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fk_cate" INTEGER NOT NULL,

    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "epis_char" (
    "id" SERIAL NOT NULL,
    "fk_char" INTEGER NOT NULL,
    "fk_epis" INTEGER NOT NULL,
    "fk_time" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "epis_char_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subc_char_epis" (
    "id" SERIAL NOT NULL,
    "fk_char" INTEGER NOT NULL,
    "fk_subc" INTEGER NOT NULL,
    "fk_epis" INTEGER NOT NULL,

    CONSTRAINT "subc_char_epis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "times" (
    "id" SERIAL NOT NULL,
    "init" TIMESTAMP(3) NOT NULL,
    "finish" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "times_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subc_char_epis_fk_char_fk_subc_fk_epis_key" ON "subc_char_epis"("fk_char", "fk_subc", "fk_epis");

-- AddForeignKey
ALTER TABLE "type_stat" ADD CONSTRAINT "type_stat_fk_type_fkey" FOREIGN KEY ("fk_type") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type_stat" ADD CONSTRAINT "type_stat_fk_state_fkey" FOREIGN KEY ("fk_state") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_fk_typestat_fkey" FOREIGN KEY ("fk_typestat") REFERENCES "type_stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_fk_typestat_fkey" FOREIGN KEY ("fk_typestat") REFERENCES "type_stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_fk_cate_fkey" FOREIGN KEY ("fk_cate") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "epis_char" ADD CONSTRAINT "epis_char_fk_char_fkey" FOREIGN KEY ("fk_char") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "epis_char" ADD CONSTRAINT "epis_char_fk_epis_fkey" FOREIGN KEY ("fk_epis") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "epis_char" ADD CONSTRAINT "epis_char_fk_time_fkey" FOREIGN KEY ("fk_time") REFERENCES "times"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subc_char_epis" ADD CONSTRAINT "subc_char_epis_fk_char_fkey" FOREIGN KEY ("fk_char") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subc_char_epis" ADD CONSTRAINT "subc_char_epis_fk_subc_fkey" FOREIGN KEY ("fk_subc") REFERENCES "subcategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subc_char_epis" ADD CONSTRAINT "subc_char_epis_fk_epis_fkey" FOREIGN KEY ("fk_epis") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
