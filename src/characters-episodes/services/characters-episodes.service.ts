import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateCharactersEpisodeDto } from '../dto/update-characters-episode.dto';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { Prisma, epis_char as EpisCharModel } from '@prisma/client';
import { CreateCharactersEpisodeDto } from '../dto/create-characters-episode.dto';
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
      this.isTimeLessThan(data.time_init, data.time_finish);

      // TODO: No puedo registrar si la suma de las apariciones del personaje en el cap es mayor a 60 min
      //const duration = this.calculateDuration(data.time_init, data.time_finish);

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

  findAll() {
    return `This action returns all charactersEpisodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} charactersEpisode`;
  }

  async update(
    id: number,
    updateCharactersEpisodeDto: UpdateCharactersEpisodeDto,
  ) {
    try {
      // Aquí debes implementar la lógica de actualización
      return `This action updates a #${id} charactersEpisode`;
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

  //______________________________________________________________________

  async calculateDuration(
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

  parseTimeToDate(value: string): Date {
    const [minutes, seconds] = value.split(':').map(Number);
    const date = new Date();
    date.setMinutes(minutes, seconds, 0);
    return date;
  }
}
