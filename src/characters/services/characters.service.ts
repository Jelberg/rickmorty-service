import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { Prisma, characters as CharactersModel } from '@prisma/client';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.charactersCreateInput): Promise<CharactersModel> {
    try {
      return this.prisma.characters.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return `This action returns all episodes`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  async remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
