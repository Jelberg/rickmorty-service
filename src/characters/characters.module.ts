import { Module } from '@nestjs/common';
import { CharactersService } from './services/characters.service';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CharactersController } from './controllers/characters.controller';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService, PrismaService],
})
export class CharactersModule {}
