-- CreateTable
CREATE TABLE "TYPES" (
    "type_id" SERIAL NOT NULL,
    "type_name" TEXT NOT NULL,

    CONSTRAINT "TYPES_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "STATUS" (
    "stat_id" SERIAL NOT NULL,
    "stat_name" TEXT NOT NULL,

    CONSTRAINT "STATUS_pkey" PRIMARY KEY ("stat_id")
);

-- CreateTable
CREATE TABLE "TYPE_STAT" (
    "ts_id" SERIAL NOT NULL,
    "ts_fk_type" INTEGER NOT NULL,
    "ts_fk_state" INTEGER NOT NULL,

    CONSTRAINT "TYPE_STAT_pkey" PRIMARY KEY ("ts_id")
);

-- CreateTable
CREATE TABLE "CHARACTERS" (
    "char_id" SERIAL NOT NULL,
    "char_fk_typestat" INTEGER NOT NULL,
    "char_name" TEXT NOT NULL,

    CONSTRAINT "CHARACTERS_pkey" PRIMARY KEY ("char_id")
);

-- CreateTable
CREATE TABLE "EPISODES" (
    "epis_id" SERIAL NOT NULL,
    "epis_fk_typestat" INTEGER NOT NULL,
    "epis_duration" INTEGER NOT NULL,

    CONSTRAINT "EPISODES_pkey" PRIMARY KEY ("epis_id")
);

-- CreateTable
CREATE TABLE "CATEGORIES" (
    "cate_id" SERIAL NOT NULL,
    "cate_name" TEXT NOT NULL,

    CONSTRAINT "CATEGORIES_pkey" PRIMARY KEY ("cate_id")
);

-- CreateTable
CREATE TABLE "SUBCATEGORIES" (
    "subc_id" SERIAL NOT NULL,
    "subc_name" TEXT NOT NULL,
    "subc_fk_cate" INTEGER NOT NULL,

    CONSTRAINT "SUBCATEGORIES_pkey" PRIMARY KEY ("subc_id")
);

-- CreateTable
CREATE TABLE "EPIS_CHAR" (
    "ec_id" SERIAL NOT NULL,
    "ec_fk_char" INTEGER NOT NULL,
    "ec_fk_epis" INTEGER NOT NULL,
    "ec_fk_time" INTEGER NOT NULL,
    "ec_duration" INTEGER NOT NULL,

    CONSTRAINT "EPIS_CHAR_pkey" PRIMARY KEY ("ec_id")
);

-- CreateTable
CREATE TABLE "SUBC_CHAR_EPIS" (
    "sce_id" SERIAL NOT NULL,
    "sce_fk_char" INTEGER NOT NULL,
    "sce_fk_subc" INTEGER NOT NULL,
    "sce_fk_epis" INTEGER NOT NULL,

    CONSTRAINT "SUBC_CHAR_EPIS_pkey" PRIMARY KEY ("sce_id")
);

-- CreateTable
CREATE TABLE "TIMES" (
    "time_id" SERIAL NOT NULL,
    "time_init" TIMESTAMP(3) NOT NULL,
    "time_finish" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TIMES_pkey" PRIMARY KEY ("time_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SUBC_CHAR_EPIS_sce_fk_char_sce_fk_subc_sce_fk_epis_key" ON "SUBC_CHAR_EPIS"("sce_fk_char", "sce_fk_subc", "sce_fk_epis");

-- AddForeignKey
ALTER TABLE "TYPE_STAT" ADD CONSTRAINT "TYPE_STAT_ts_fk_type_fkey" FOREIGN KEY ("ts_fk_type") REFERENCES "TYPES"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TYPE_STAT" ADD CONSTRAINT "TYPE_STAT_ts_fk_state_fkey" FOREIGN KEY ("ts_fk_state") REFERENCES "STATUS"("stat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CHARACTERS" ADD CONSTRAINT "CHARACTERS_char_fk_typestat_fkey" FOREIGN KEY ("char_fk_typestat") REFERENCES "TYPE_STAT"("ts_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPISODES" ADD CONSTRAINT "EPISODES_epis_fk_typestat_fkey" FOREIGN KEY ("epis_fk_typestat") REFERENCES "TYPE_STAT"("ts_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SUBCATEGORIES" ADD CONSTRAINT "SUBCATEGORIES_subc_fk_cate_fkey" FOREIGN KEY ("subc_fk_cate") REFERENCES "CATEGORIES"("cate_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPIS_CHAR" ADD CONSTRAINT "EPIS_CHAR_ec_fk_char_fkey" FOREIGN KEY ("ec_fk_char") REFERENCES "CHARACTERS"("char_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPIS_CHAR" ADD CONSTRAINT "EPIS_CHAR_ec_fk_epis_fkey" FOREIGN KEY ("ec_fk_epis") REFERENCES "EPISODES"("epis_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EPIS_CHAR" ADD CONSTRAINT "EPIS_CHAR_ec_fk_time_fkey" FOREIGN KEY ("ec_fk_time") REFERENCES "TIMES"("time_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" ADD CONSTRAINT "SUBC_CHAR_EPIS_sce_fk_char_fkey" FOREIGN KEY ("sce_fk_char") REFERENCES "CHARACTERS"("char_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" ADD CONSTRAINT "SUBC_CHAR_EPIS_sce_fk_subc_fkey" FOREIGN KEY ("sce_fk_subc") REFERENCES "SUBCATEGORIES"("subc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SUBC_CHAR_EPIS" ADD CONSTRAINT "SUBC_CHAR_EPIS_sce_fk_epis_fkey" FOREIGN KEY ("sce_fk_epis") REFERENCES "EPISODES"("epis_id") ON DELETE RESTRICT ON UPDATE CASCADE;
