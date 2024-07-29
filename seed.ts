import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.types.deleteMany({});
  await prisma.status.deleteMany({});
  await prisma.categories.deleteMany({});
  await prisma.subcategories.deleteMany({});
  await prisma.type_stat.deleteMany({});
  await prisma.characters.deleteMany({});
  await prisma.episodes.deleteMany({});
  await prisma.times.deleteMany({});
  await prisma.epis_char.deleteMany({});
  await prisma.subc_char_epis.deleteMany({});

  await prisma.types.createMany({
    data: [
      { id: 1, name: 'episodes' },
      { id: 2, name: 'characters' },
    ],
  });

  await prisma.status.createMany({
    data: [
      { id: 1, name: 'active' },
      { id: 2, name: 'suspended' },
      { id: 3, name: 'cancelled' },
    ],
  });

  await prisma.categories.createMany({
    data: [
      { id: 1, name: 'specie' },
      { id: 2, name: 'season' },
    ],
  });

  await prisma.subcategories.createMany({
    data: [
      { id: 1, name: 'human', fk_cate: 1 },
      { id: 2, name: 'alien', fk_cate: 1 },
      { id: 3, name: 'S01', fk_cate: 2 },
      { id: 4, name: 'S02', fk_cate: 2 },
      { id: 5, name: 'S03', fk_cate: 2 },
      { id: 6, name: 'S04', fk_cate: 2 },
      { id: 7, name: 'S05', fk_cate: 2 },
      { id: 8, name: 'S06', fk_cate: 2 },
    ],
  });

  await prisma.type_stat.createMany({
    data: [
      { id: 1, fk_type: 1, fk_state: 1 },
      { id: 2, fk_type: 1, fk_state: 2 },
      { id: 3, fk_type: 2, fk_state: 1 },
      { id: 4, fk_type: 2, fk_state: 2 },
    ],
  });

  await prisma.characters.createMany({
    data: [
      { id: 1, fk_typestat: 3, name: 'Rick Sanchez', type: null },
      { id: 2, fk_typestat: 3, name: 'Albert Einstein', type: '' },
      {
        id: 3,
        fk_typestat: 3,
        name: 'Alan Rails',
        type: 'Superhuman (Ghost trains summoner)',
      },
      { id: 4, fk_typestat: 3, name: 'Morty Smith', type: '' },
    ],
  });

  await prisma.episodes.createMany({
    data: [
      { id: 1, fk_typestat: 1, name: 'Pilot', episode: 'S01E01', duration: 0 },
      {
        id: 2,
        fk_typestat: 1,
        name: 'Rixty Minutes',
        episode: 'S01E08',
        duration: 50,
      },
      {
        id: 3,
        fk_typestat: 1,
        name: 'Mortynight Run',
        episode: 'S02E02',
        duration: 60,
      },
      {
        id: 4,
        fk_typestat: 1,
        name: 'Get Schwifty',
        episode: 'S02E05',
        duration: 35,
      },
      {
        id: 5,
        fk_typestat: 1,
        name: "Look Who's Purging Now",
        episode: 'S02E09',
        duration: 35,
      },
      {
        id: 6,
        fk_typestat: 1,
        name: 'Rick Potion #9',
        episode: 'S01E06',
        duration: 20,
      },
    ],
  });

  await prisma.times.createMany({
    data: [
      { id: 1, init: '20:04', finish: '22:04' },
      { id: 2, init: '01:00', finish: '10:00' },
      { id: 3, init: '10:00', finish: '15:00' },
      { id: 4, init: '23:00', finish: '32:00' },
      { id: 5, init: '16:00', finish: '20:00' },
      { id: 6, init: '16:00', finish: '20:00' },
      { id: 7, init: '01:00', finish: '02:00' },
      { id: 8, init: '01:00', finish: '02:00' },
    ],
  });

  await prisma.epis_char.createMany({
    data: [
      { id: 2, fk_char: 1, fk_epis: 2, fk_time: 2 },
      { id: 3, fk_char: 1, fk_epis: 2, fk_time: 3 },
      { id: 4, fk_char: 1, fk_epis: 2, fk_time: 4 },
      { id: 5, fk_char: 1, fk_epis: 2, fk_time: 5 },
      { id: 6, fk_char: 2, fk_epis: 3, fk_time: 6 },
      { id: 7, fk_char: 2, fk_epis: 3, fk_time: 7 },
      { id: 8, fk_char: 3, fk_epis: 5, fk_time: 8 },
    ],
  });

  await prisma.subc_char_epis.createMany({
    data: [
      { id: 1, fk_char: 1, fk_subc: 1, fk_epis: null },
      { id: 2, fk_char: 2, fk_subc: 1, fk_epis: null },
      { id: 3, fk_char: 3, fk_subc: 1, fk_epis: null },
      { id: 4, fk_char: 4, fk_subc: 1, fk_epis: null },
      { id: 5, fk_char: null, fk_subc: 3, fk_epis: 1 },
      { id: 6, fk_char: null, fk_subc: 3, fk_epis: 2 },
      { id: 7, fk_char: null, fk_subc: 4, fk_epis: 3 },
      { id: 8, fk_char: null, fk_subc: 4, fk_epis: 4 },
      { id: 9, fk_char: null, fk_subc: 4, fk_epis: 5 },
      { id: 10, fk_char: null, fk_subc: 3, fk_epis: 6 },
    ],
  });

  // Update the sequences to their correct values
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.categories_id_seq', 2, true);`;
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.characters_id_seq', 4, true);`;
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.epis_char_id_seq', 8, true);`;
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.episodes_id_seq', 6, true);`;
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.status_id_seq', 3, true);`;
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.subc_char_epis_id_seq', 10, true);`;
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.subcategories_id_seq', 8, true);`;
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.times_id_seq', 8, true);`;
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.type_stat_id_seq', 4, true);`;
  //await prisma.$executeRaw`SELECT pg_catalog.setval('public.types_id_seq', 2, true);`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
