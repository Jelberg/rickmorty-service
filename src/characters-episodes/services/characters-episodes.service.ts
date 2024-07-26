import { Injectable } from '@nestjs/common';
import { CreateCharactersEpisodeDto } from '../dto/create-characters-episode.dto';
import { UpdateCharactersEpisodeDto } from '../dto/update-characters-episode.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { Prisma, epis_char as EpisCharModel } from '@prisma/client';

@Injectable()
export class CharactersEpisodesService {
  constructor(private prisma: PrismaService) {}

  create(createCharactersEpisodeDto: CreateCharactersEpisodeDto) {
    return 'This action adds a new charactersEpisode';
  }

  findAll() {
    return `This action returns all charactersEpisodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} charactersEpisode`;
  }

  update(id: number, updateCharactersEpisodeDto: UpdateCharactersEpisodeDto) {
    return `This action updates a #${id} charactersEpisode`;
  }

  remove(id: number) {
    return `This action removes a #${id} charactersEpisode`;
  }
}
