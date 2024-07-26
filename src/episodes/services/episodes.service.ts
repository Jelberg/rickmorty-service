import { Injectable } from '@nestjs/common';
import { UpdateEpisodeDto } from '../dto/update-episode.dto';
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

  async findAll() {
    return `This action returns all episodes`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  async update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
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
