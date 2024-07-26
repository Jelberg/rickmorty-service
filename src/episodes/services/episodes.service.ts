import { Injectable } from '@nestjs/common';
import { UpdateEpisodeDto } from '../dto/update-episode.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { Prisma, episodes as EpisodesModel } from '@prisma/client';

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

  async remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
