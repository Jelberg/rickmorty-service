import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateCharactersEpisodeDto } from '../dto/update-characters-episode.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateCharactersEpisodeDto } from '../dto/create-characters-episode.dto';
import { mapEpisodes } from 'src/commons/mappers/character.mapper';
import { ParseTimePipe } from 'src/pipes/parse-time/parse-time.pipe';

@Injectable()
export class CharactersEpisodesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCharactersEpisodeDto) {
    try {
      const char = await this.findCharacterById(data.fk_char);
      const episode = await this.findEpisodeById(data.fk_epis);

      if (!char || !episode) {
        throw new BadRequestException('Character or Episode not found');
      }
      if (
        this.isTimeExceededDurationEpisode(
          data.time_init,
          data.time_finish,
          episode.duration,
        )
      ) {
        throw new BadRequestException(
          'The time init or time finish exceeds the episode duration',
        );
      }
      this.isTimeLessThan(data.time_init, data.time_finish);

      //Para validar los registros de tiempo
      const epis_char = await this.getAllCharactersEpisodesByCharIdEpiId(
        data.fk_epis,
        data.fk_char,
      );

      const times = epis_char.map((elem) => elem.times);

      const newStart = this.parseTimeToDate(data.time_init.value);
      const newEnd = this.parseTimeToDate(data.time_finish.value);

      if (this.isOverlapping(newStart, newEnd, times)) {
        throw new BadRequestException(
          'New time period overlaps with existing times.',
        );
      }
      const duration = this.calculateDuration(data.time_init, data.time_finish);
      if (this.isDurationExceeded(duration, times, episode.duration)) {
        throw new BadRequestException('New Character period exceeds.');
      }

      const time = await this.prisma.times.create({
        data: {
          init: data.time_init.value,
          finish: data.time_finish.value,
        },
      });

      return await this.prisma.epis_char.create({
        data: {
          characters: { connect: { id: data.fk_char } },
          episodes: { connect: { id: data.fk_epis } },
          times: { connect: { id: time.id } },
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

  async getAllCharactersEpisodesByCharIdEpiId(
    epis_id: number,
    char_id: number,
  ) {
    try {
      return await this.prisma.epis_char.findMany({
        where: {
          episodes: {
            id: epis_id,
          },
          characters: {
            id: char_id,
          },
        },
        include: {
          times: true,
          characters: true,
          episodes: true,
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
        epis_char: {
          include: {
            times: true,
            episodes: true,
          },
        },
      },
      orderBy,
    });
    console.log(results[3].epis_char.length);

    const totalCount = await this.prisma.characters.count({
      where,
    });
    const totalPages = Math.ceil(totalCount / pageSize);

    const info = {
      count: totalCount,
      pages: totalPages,
    };

    const data = [];

    results.forEach((element) => {
      //console.log(element);
      data.push({
        id: element.id,
        name: element.name,
        type: element.type,
        episodes: mapEpisodes(element.epis_char),
      });
    });

    return { info, data };
  }

  findOne(id: number) {
    return `This action returns a #${id} charactersEpisode`;
  }

  async update(id: number, data: UpdateCharactersEpisodeDto) {
    try {
      const epis_chat = await this.prisma.epis_char.findUnique({
        where: {
          id: id,
        },
        include: {
          episodes: true,
        },
      });
      if (!epis_chat) {
        throw new BadRequestException('Episode x Character not found');
      }

      if (
        this.isTimeExceededDurationEpisode(
          data.time_init,
          data.time_finish,
          epis_chat.episodes.duration,
        )
      ) {
        throw new BadRequestException(
          'The time init or time finish exceeds the episode duration',
        );
      }

      this.isTimeLessThan(data.time_init, data.time_finish);

      const epis_char_times = await this.getAllCharactersEpisodesByCharIdEpiId(
        epis_chat.fk_epis,
        epis_chat.fk_char,
      );

      const times = epis_char_times
        .filter((elem) => elem.id != id)
        .map((elem) => elem.times);

      const newStart = this.parseTimeToDate(data.time_init.value);
      const newEnd = this.parseTimeToDate(data.time_finish.value);

      if (this.isOverlapping(newStart, newEnd, times)) {
        throw new BadRequestException(
          'New time period overlaps with existing times.',
        );
      }

      const duration = this.calculateDuration(data.time_init, data.time_finish);
      if (
        this.isDurationExceeded(duration, times, epis_chat.episodes.duration)
      ) {
        throw new BadRequestException('New Character period exceeds.');
      }

      return await this.prisma.epis_char.update({
        where: {
          id,
        },
        data: {
          times: {
            update: {
              init: data.time_init.value,
              finish: data.time_finish.value,
            },
          },
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

  async remove(char_id: number, epis_id: number) {
    try {
      const relatedTimes = await this.prisma.epis_char.findMany({
        where: {
          fk_char: char_id,
          fk_epis: epis_id,
        },
        select: {
          fk_time: true,
        },
      });

      const timeIds = relatedTimes.map((record) => record.fk_time);

      const deleteEpisCharResult = await this.prisma.epis_char.deleteMany({
        where: {
          fk_char: char_id,
          fk_epis: epis_id,
        },
      });

      if (timeIds.length > 0) {
        const deleteTimesResult = await this.prisma.times.deleteMany({
          where: {
            id: {
              in: timeIds,
            },
          },
        });
        console.log(`Deleted ${deleteTimesResult.count} times records`);
      }

      return {
        deletedEpisCharCount: deleteEpisCharResult.count,
        message: `Deleted ${deleteEpisCharResult.count} epis_char records and related times records`,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async findCharacters(params): Promise<any[]> {
    try {
      const { characterStatus, episodeStatus, season } = params;

      const newSeason = season ? { episode: { contains: season } } : {};
      const newCharacterStatus = characterStatus
        ? { type_stat: { status: { name: characterStatus } } }
        : {};
      const newEpisodeStatus = episodeStatus
        ? { type_stat: { status: { name: episodeStatus } } }
        : {};

      const conditionEpiChar =
        episodeStatus || season
          ? {
              epis_char: {
                some: {
                  episodes: {
                    ...newEpisodeStatus,
                    ...newSeason,
                  },
                },
              },
            }
          : {};

      const results = await this.prisma.characters.findMany({
        where: {
          ...newCharacterStatus,
          ...conditionEpiChar,
        },
        include: {
          type_stat: {
            include: {
              status: true,
            },
          },
          epis_char: {
            include: {
              times: true,
              episodes: {
                include: {
                  type_stat: {
                    include: {
                      status: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const data = results.map((character) => {
        // Episodios por ID y consolidar los tiempos
        const episodesMap = new Map<number, any>();

        character.epis_char.forEach((ec) => {
          if (!episodesMap.has(ec.episodes.id)) {
            episodesMap.set(ec.episodes.id, {
              episodeId: ec.episodes.id,
              episodeName: ec.episodes.name,
              episodeDuration: ec.episodes.duration,
              status: ec.episodes.type_stat.status.name,
              times: [],
            });
          }
          episodesMap.get(ec.episodes.id)?.times.push(ec.times);
        });
        const episodes = Array.from(episodesMap.values());

        return {
          id: character.id,
          name: character.name,
          type: character.type,
          status: character.type_stat?.status?.name || 'Unknown',
          episodes: episodes,
        };
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

  //______________________________________________________________________

  calculateDuration(
    time_init: { minutes: number; seconds: number },
    time_finish: { minutes: number; seconds: number },
  ) {
    try {
      const timeInitInMinutes = time_init.minutes + time_init.seconds / 60;
      const timeFinishInMinutes =
        time_finish.minutes + time_finish.seconds / 60;

      return timeFinishInMinutes - timeInitInMinutes;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async isTimeLessThan(
    time_init: { minutes: number; seconds: number },
    time_finish: { minutes: number; seconds: number },
  ) {
    try {
      const timeInitInMinutes = time_init.minutes + time_init.seconds / 60;
      const timeFinishInMinutes =
        time_finish.minutes + time_finish.seconds / 60;

      if (timeInitInMinutes >= timeFinishInMinutes) {
        console.error('Error validating time: !!!!!!!');
        throw new BadRequestException(
          'Time init must be less than time finish',
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException('An unknown error occurred');
      }
    }
  }

  async findCharacterById(id: number) {
    try {
      return await this.prisma.characters.findUnique({
        where: {
          id,
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

  async findEpisodeById(id: number) {
    try {
      return await this.prisma.episodes.findUnique({
        where: {
          id,
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

  isOverlapping(
    newStart: Date,
    newEnd: Date,
    existingTimes: { id: number; init: string; finish: string }[],
  ): boolean {
    return existingTimes.some(({ init, finish }) => {
      const parseInit = this.parseTimeToDate(init);
      const parseFinish = this.parseTimeToDate(finish);
      return newStart < parseFinish && newEnd > parseInit;
    });
  }

  isDurationExceeded(
    currentDuration: number,
    existingTimes: { id: number; init: string; finish: string }[],
    episodeDuration: number,
  ): boolean {
    let count = 0;
    existingTimes.forEach(({ init, finish }) => {
      const transformTimeInit = new ParseTimePipe().transform(init);
      const transformTimeFinish = new ParseTimePipe().transform(finish);
      const calculateDuration = this.calculateDuration(
        transformTimeInit,
        transformTimeFinish,
      );
      count = count + calculateDuration;
    });
    const total = count + currentDuration;
    return total > episodeDuration || total > 60;
  }

  //Para validar que los minutos registrados no excedan a la duracion del episodio
  isTimeExceededDurationEpisode(
    time_init: { minutes: number; seconds: number },
    time_finish: { minutes: number; seconds: number },
    episodeDuration: number,
  ): boolean {
    if (time_init.minutes >= episodeDuration) {
      return true;
    }
    if (time_finish.minutes >= episodeDuration) {
      return true;
    }
    return false;
  }

  parseTimeToDate(value: string): Date {
    const [minutes, seconds] = value.split(':').map(Number);
    const date = new Date();
    date.setMinutes(minutes, seconds, 0);
    return date;
  }
}
