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

  async findAll(params: {
    skip?: number;
    take?: 5;
    cursor?: Prisma.charactersWhereUniqueInput;
    where?: Prisma.charactersWhereInput;
    orderBy?: Prisma.charactersOrderByWithRelationInput;
  }): Promise<CharactersModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.characters.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  async update(params: {
    where: Prisma.charactersWhereUniqueInput;
    data: Prisma.charactersUpdateInput;
  }): Promise<CharactersModel> {
    try {
      const { data, where } = params;
      return this.prisma.characters.update({
        data,
        where,
      });
    } catch (error) {
      console.log(error);
    }
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
