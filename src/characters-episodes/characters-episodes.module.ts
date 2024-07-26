import { Module } from '@nestjs/common';
import { CharactersEpisodesService } from './services/characters-episodes.service';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CharactersEpisodesController } from './controllers/characters-episodes.controller';

@Module({
  controllers: [CharactersEpisodesController],
  providers: [CharactersEpisodesService, PrismaService],
})
export class CharactersEpisodesModule {}
