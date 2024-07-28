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
import {
  mapTypeStat,
  mapSubcCharEpis,
} from 'src/commons/mappers/character.mapper';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCharacterDto): Promise<CharactersModel> {
    try {
      await this.validateSpecieAndType(data.specie, data.type, data.name);

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
    page?: number;
    pageSize?: number;
    cursor?: Prisma.charactersWhereUniqueInput;
    where?: Prisma.charactersWhereInput;
    orderBy?: Prisma.charactersOrderByWithRelationInput;
  }): Promise<{ info: any; data: any }> {
    const { page = 1, pageSize = 5, cursor, where, orderBy } = params;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const results = await this.prisma.characters.findMany({
      skip,
      take,
      cursor,
      where,
      include: {
        type_stat: {
          include: {
            status: true,
          },
        },
        subc_char_epis: {
          include: {
            subcategories: {
              include: {
                categories: true,
              },
            },
          },
        },
      },
      orderBy,
    });

    const totalCount = await this.prisma.characters.count({
      where,
    });
    const totalPages = Math.ceil(totalCount / pageSize);

    const info = {
      count: totalCount,
      pages: totalPages,
    };

    const data = [];
    results.forEach((character) => {
      data.push({
        id: character.id,
        name: character.name,
        type: character.type,
        type_stat: mapTypeStat(character.type_stat),
        subc_char_epis: mapSubcCharEpis(character.subc_char_epis),
      });
    });

    return { info, data };
  }

  async findOne(id: number) {
    const character = await this.prisma.characters.findFirst({
      where: { id: Number(id) },
      include: {
        type_stat: {
          include: {
            status: true,
          },
        },
        subc_char_epis: {
          include: {
            subcategories: {
              include: {
                categories: true,
              },
            },
          },
        },
      },
    });

    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }

    const formattedCharacter = {
      id: character.id,
      name: character.name,
      type: character.type,
      type_stat: mapTypeStat(character.type_stat),
      subc_char_epis: mapSubcCharEpis(character.subc_char_epis),
    };

    return formattedCharacter;
  }

  async update(id: number, data: UpdateCharacterDto): Promise<CharactersModel> {
    try {
      const character = await this.findOne(id);
      const currentSpecie = data.specie
        ? data.specie
        : character.subc_char_epis['subcategoryName'];
      const type = data.type ? data.type : character.type;
      const name = data.name ? data.name : character.name;
      await this.validateSpecieAndType(currentSpecie, type, name);

      const { status_char, specie, ...restData } = data;
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

      if (specie) {
        const subcategory = await this.getSubcategoryByNameAndCategory(
          specie,
          CATEGORIES.SPECIE,
        );
        if (!subcategory) {
          throw new Error(`Subcategory with name "${specie}" not found.`);
        }
        //Encuentro el registro de la categoria especie
        const findSpecie = character.subc_char_epis.find(
          (entry) => entry.categoryName === CATEGORIES.SPECIE,
        );

        await this.prisma.subc_char_epis.update({
          data: { fk_subc: subcategory.id },
          where: {
            id: findSpecie.id,
          },
        });
      }

      return await this.prisma.characters.update({
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

  async find(species: string, type?: string) {
    try {
      const where = type ? { type: { contains: type } } : {};
      const characters = await this.prisma.characters.findMany({
        where: {
          ...where,
          subc_char_epis: {
            some: {
              subcategories: {
                name: species,
                categories: {
                  name: CATEGORIES.SPECIE,
                },
              },
            },
          },
        },
        include: {
          subc_char_epis: {
            include: {
              subcategories: {
                include: {
                  categories: true,
                },
              },
            },
          },
        },
      });

      const data = [];
      characters.map((character) => {
        data.push({
          id: character.id,
          name: character.name,
          type: character.type,
          categories: CATEGORIES.SPECIE,
          subcategories: mapSubcCharEpis(character.subc_char_epis),
        });
      });

      return data;
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
    nameCharacter: string,
  ) {
    try {
      const characters = await this.prisma.characters.findMany({
        where: {
          name: nameCharacter,
        },
      });

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
