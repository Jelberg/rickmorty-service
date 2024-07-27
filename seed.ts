import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
      { id: 1, fk_cate: 1, name: 'human' },
      { id: 2, fk_cate: 1, name: 'alien' },
      { id: 3, fk_cate: 2, name: 'S01' },
      { id: 4, fk_cate: 2, name: 'S02' },
      { id: 5, fk_cate: 2, name: 'S03' },
      { id: 6, fk_cate: 2, name: 'S04' },
      { id: 7, fk_cate: 2, name: 'S05' },
      { id: 8, fk_cate: 2, name: 'S06' },
    ],
  });

  await prisma.type_stat.createMany({
    data: [
      {
        id: 1,
        fk_type: 1,
        fk_state: 1,
      },
      {
        id: 2,
        fk_type: 1,
        fk_state: 2,
      },
      {
        id: 3,
        fk_type: 2,
        fk_state: 1,
      },
      {
        id: 4,
        fk_type: 2,
        fk_state: 2,
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
