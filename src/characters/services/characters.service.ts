import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import {
  Prisma,
  characters as CharactersModel,
  subcategories as SubcategoriesModel,
} from '@prisma/client';
import { STATUS, TYPES, CATEGORIES } from 'src/commons/enum';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCharacterDto): Promise<CharactersModel> {
    try {
      const characters = await this.prisma.characters.findMany({
        where: {
          name: data.name,
        },
      });

      if (characters.length > 0) {
        await this.validateSpecieAndType(data.specie, data.type, characters);
      }

      const { status_char, specie, ...restData } = data;
      const currentStatusChar = status_char ? status_char : STATUS.ACTIVE;
      const type_stat = await this.getTypeStat(
        currentStatusChar,
        TYPES.CHARACTERS,
      );

      const subcategory = await this.getSubcategoryByNameAndCategory(
        specie,
        CATEGORIES.SPECIE,
      );

      const character = await this.prisma.characters.create({
        data: {
          ...restData,
          type_stat: { connect: { id: type_stat.id } },
        },
      });

      await this.prisma.subc_char_epis.create({
        data: {
          fk_char: character.id,
          fk_subc: subcategory.id,
        },
      });

      return character;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.charactersWhereUniqueInput;
    where?: Prisma.charactersWhereInput;
    orderBy?: Prisma.charactersOrderByWithRelationInput;
  }): Promise<CharactersModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.characters.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: number) {
    const character = await this.prisma.characters.findUnique({
      where: { id },
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    return character;
  }

  async update(id: number, data: UpdateCharacterDto): Promise<CharactersModel> {
    try {
      const { status_char, ...restData } = data;
      const updateData: any = {
        ...restData,
      };

      if (status_char) {
        const currentStatusChar = await this.getTypeStat(
          status_char,
          TYPES.CHARACTERS,
        );

        updateData.type_stat = {
          connect: { id: currentStatusChar.id },
        };
      }

      return this.prisma.characters.update({
        data: updateData,
        where: { id: Number(id) },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async deleteCharacter(params: { where: Prisma.charactersWhereUniqueInput }) {
    try {
      const { where } = params;

      const typeStatus = await this.getTypeStat(
        STATUS.SUSPENDED,
        TYPES.CHARACTERS,
      );

      return this.prisma.characters.update({
        where,
        data: {
          fk_typestat: typeStatus.id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  //_____________________________________________________________________

  async getTypeStat(status: string, type: string) {
    try {
      const typeStatus = await this.prisma.type_stat.findFirst({
        where: {
          status: {
            name: status,
          },
          types: {
            name: type,
          },
        },
      });

      if (!typeStatus) {
        throw new NotFoundException(
          `No matching type_stat found for status "${status}" and type "${type}".`,
        );
      }

      return typeStatus;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async getSubcategoryByNameAndCategory(
    name_subcategory: string,
    category: string,
  ): Promise<SubcategoriesModel> {
    try {
      const subcategory = await this.prisma.subcategories.findFirst({
        where: {
          name: name_subcategory,
          categories: {
            name: category,
          },
        },
      });
      return subcategory;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async getListSubcategoriesByCategory(categoryName: string) {
    try {
      const category = await this.prisma.categories.findFirst({
        where: {
          name: categoryName,
        },
      });

      if (!category) {
        throw new Error(`Category with name "${categoryName}" not found.`);
      }

      const subcategories = await this.prisma.subcategories.findMany({
        where: {
          fk_cate: category.id,
        },
      });

      return subcategories;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async validateSpecieAndType(
    specie: string,
    typeCharacter: string,
    characters: CharactersModel[],
  ) {
    try {
      const subcategories = await this.getListSubcategoriesByCategory(
        CATEGORIES.SPECIE,
      );

      if (subcategories.length === 0) {
        throw new NotFoundException(
          `No subcategories found for category ${CATEGORIES.SPECIE}`,
        );
      }
      for (const character of characters) {
        if (character.type === typeCharacter) {
          throw new BadRequestException(
            `Matching type found for character ${character.name}`,
          );
        }
        const currentSpecie = await this.prisma.subcategories.findFirst({
          include: {
            subc_char_epis: true,
          },
          where: {
            name: specie,
          },
        });
        if (
          currentSpecie &&
          currentSpecie.subc_char_epis.some(
            (entry) => entry.fk_char === character.id,
          )
        ) {
          throw new BadRequestException('Matching specie found for character');
        }
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }
}
