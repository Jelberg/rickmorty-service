import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/services/prisma.service';
import { ModuleModule } from './prisma/module.module';
import { EpisodesModule } from './episodes/episodes.module';

@Module({
  imports: [ModuleModule, EpisodesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
