import { Injectable } from '@nestjs/common';
import { UpdateCharactersEpisodeDto } from '../dto/update-characters-episode.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { Prisma, epis_char as EpisCharModel } from '@prisma/client';

@Injectable()
export class CharactersEpisodesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.epis_charCreateInput): Promise<EpisCharModel> {
    try {
      return this.prisma.epis_char.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all charactersEpisodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} charactersEpisode`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateCharactersEpisodeDto: UpdateCharactersEpisodeDto) {
    return `This action updates a #${id} charactersEpisode`;
  }

  remove(where: Prisma.epis_charWhereUniqueInput): Promise<EpisCharModel> {
    try {
      return this.prisma.epis_char.delete({
        where,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
