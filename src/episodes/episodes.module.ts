import { Module } from '@nestjs/common';
import { EpisodesService } from './services/episodes.service';
import { EpisodesController } from './controllers/episodes.controller';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Module({
  controllers: [EpisodesController],
  providers: [EpisodesService, PrismaService],
  imports: [],
})
export class EpisodesModule {}
