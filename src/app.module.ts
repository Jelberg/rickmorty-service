import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/services/prisma.service';
import { ModuleModule } from './prisma/module.module';

@Module({
  imports: [ModuleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
