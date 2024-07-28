import { Prisma } from '@prisma/client';

export interface FindCharactersParams {
  characterStatus?: Prisma.statusWhereInput;
  episodeStatus?: Prisma.statusWhereInput;
  season?: string;
}
