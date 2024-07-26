import { Module } from '@nestjs/common';
import { EpisodesService } from './services/episodes.service';
import { EpisodesController } from './controllers/episodes.controller';

@Module({
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
