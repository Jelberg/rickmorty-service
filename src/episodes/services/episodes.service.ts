import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import {
  Prisma,
  episodes as EpisodesModel,
  subcategories as SubcategoriesModel,
} from '@prisma/client';
import { CATEGORIES, STATUS, TYPES } from 'src/commons/enum';
import { CreateEpisodeDto } from '../dto/create-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEpisodeDto): Promise<EpisodesModel> {
    try {
      const { status, episode, ...restData } = data;
      await this.validateEpisode(episode.season, data.name);

      const type_stat = await this.getTypeStat(status, TYPES.EPISODES);

      const subcategory = await this.getSubcategoryByNameAndCategory(
        episode.season,
        CATEGORIES.SEASON,
      );

      if (!subcategory) {
        throw new NotFoundException(
          `No matching season found for season "${episode.season}"`,
        );
      }

      const existingEpisode = await this.prisma.subc_char_epis.findFirst({
        where: {
          fk_subc: subcategory.id,
          episodes: {
            name: data.name,
          },
        },
      });

      if (existingEpisode) {
        throw new ConflictException(
          `Episode "${data.name}" already exists in season "${episode.season}"`,
        );
      }

      const newEpisode = await this.prisma.episodes.create({
        data: {
          ...restData,
          episode: episode.episode,
          type_stat: { connect: { id: type_stat.id } },
        },
      });

      await this.prisma.subc_char_epis.create({
        data: {
          fk_epis: newEpisode.id,
          fk_subc: subcategory.id,
        },
      });

      return newEpisode;
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
    cursor?: Prisma.episodesWhereUniqueInput;
    where?: Prisma.episodesWhereInput;
    orderBy?: Prisma.episodesOrderByWithRelationInput;
  }) {
    try {
      const { page = 1, pageSize = 5, cursor, where, orderBy } = params || {};
      const skip = (page - 1) * pageSize;
      console.log(page, pageSize, skip);
      const take = pageSize;

      // Validar que los parámetros sean números positivos
      if (page <= 0 || pageSize <= 0) {
        throw new BadRequestException(
          'Page and pageSize must be positive numbers.',
        );
      }

      const results = await this.prisma.episodes.findMany({
        skip: isNaN(skip) ? 0 : skip,
        take: isNaN(take) ? 5 : take,
        cursor: cursor ? cursor : undefined,
        where: where ? where : undefined,
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
        orderBy: orderBy ? orderBy : undefined,
      });

      const totalCount = await this.prisma.episodes.count({ where });
      const totalPages = Math.ceil(totalCount / pageSize);

      const info = {
        count: totalCount,
        pages: totalPages,
      };

      const data = results.map((episode) => ({
        id: episode.id,
        name: episode.name,
        episode: episode.episode,
        duration: episode.duration,
        // Puedes agregar más campos aquí si es necesario
      }));

      return { info, data };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  async update(params: {
    where: Prisma.episodesWhereUniqueInput;
    data: Prisma.episodesUpdateInput;
  }): Promise<EpisodesModel> {
    try {
      const { data, where } = params;
      return this.prisma.episodes.update({
        data,
        where,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async deleteEpisode(params: { where: Prisma.episodesWhereUniqueInput }) {
    try {
      const { where } = params;

      const typeStatus = await this.prisma.status.findFirst({
        include: {
          type_stat: true,
        },
        where: { name: STATUS.CANCELLED },
      });

      return this.prisma.episodes.update({
        where,
        data: {
          fk_typestat: typeStatus.type_stat[0].id,
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

  async validateEpisode(season: string, nameEpisode: string) {
    try {
      const subcategory = await this.getSubcategoryByNameAndCategory(
        season,
        CATEGORIES.SEASON,
      );
      if (!subcategory) {
        throw new NotFoundException(
          `No matching season found for season "${season}"`,
        );
      }

      const episodes = await this.prisma.episodes.findMany({
        where: {
          name: nameEpisode,
          subc_char_epis: {
            some: {
              fk_subc: subcategory.id,
            },
          },
        },
      });

      if (episodes.length > 0) {
        throw new ConflictException(
          `Episode name "${nameEpisode}" already exists in season "${season}"`,
        );
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
