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

  await prisma.type_stat.createMany({
    data: [
      {
        id: 1,
        fk_type: 1,
        fk_state: 3,
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
