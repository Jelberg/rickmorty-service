import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/services/prisma.service';
import { ModuleModule } from './prisma/module.module';
import { EpisodesModule } from './episodes/episodes.module';
import { CharactersModule } from './characters/characters.module';
import { CharactersEpisodesModule } from './characters-episodes/characters-episodes.module';

@Module({
  imports: [
    ModuleModule,
    EpisodesModule,
    CharactersModule,
    CharactersEpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
