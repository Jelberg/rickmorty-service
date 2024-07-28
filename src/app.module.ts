import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/services/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EpisodesModule } from './features/episodes/episodes.module';
import { CharactersModule } from './features/characters/characters.module';
import { CharactersEpisodesModule } from './features/characters-episodes/characters-episodes.module';

@Module({
  imports: [
    PrismaModule,
    EpisodesModule,
    CharactersModule,
    CharactersEpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
