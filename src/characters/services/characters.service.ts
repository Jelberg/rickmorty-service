import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { Prisma, characters as CharactersModel } from '@prisma/client';
import { STATUS } from 'src/commons/enum';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.charactersCreateInput): Promise<CharactersModel> {
    try {
      return this.prisma.characters.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return `This action returns all episodes`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  async deleteCharacter(params: { where: Prisma.episodesWhereUniqueInput }) {
    try {
      const { where } = params;

      const typeStatus = await this.prisma.status.findFirst({
        include: {
          type_stat: true,
        },
        where: { name: STATUS.SUSPENDED },
      });

      return this.prisma.episodes.update({
        where,
        data: {
          fk_typestat: typeStatus.type_stat[0].id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
