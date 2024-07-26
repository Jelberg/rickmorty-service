import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { Prisma, episodes as EpisodesModel } from '@prisma/client';
import { STATUS } from 'src/commons/enum';

@Injectable()
export class EpisodesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.episodesCreateInput): Promise<EpisodesModel> {
    try {
      return this.prisma.episodes.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(params: {
    skip?: number;
    take?: 5;
    cursor?: Prisma.episodesWhereUniqueInput;
    where?: Prisma.episodesWhereInput;
    orderBy?: Prisma.episodesOrderByWithRelationInput;
  }): Promise<EpisodesModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.episodes.findMany({
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
    where: Prisma.episodesWhereUniqueInput;
    data: Prisma.episodesUpdateInput;
  }): Promise<EpisodesModel> {
    try {
      console.log('llego');
      const { data, where } = params;
      console.log(data);
      console.log(where);
      return this.prisma.episodes.update({
        data,
        where,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteEpisode(params: { where: Prisma.episodesWhereUniqueInput }) {
    try {
      const { where } = params;

      const typeStatus = await this.prisma.status.findFirst({
        include: {
          type_stat: true,
        },
        where: { name: STATUS.CANCELLED },
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
