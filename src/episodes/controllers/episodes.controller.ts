import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EpisodesService } from '../services/episodes.service';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { UpdateEpisodeDto } from '../dto/update-episode.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('episodes')
@ApiTags('Episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    const { name, episode, duration, type_stat } = createEpisodeDto;
    return this.episodesService.create({
      name,
      episode,
      duration,
      type_stat: {
        connect: { id: type_stat.id },
      },
    });
  }

  @Get()
  findAll() {
    return this.episodesService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(+id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ) {
    const { type_stat, ...data } = updateEpisodeDto;

    const updateData: any = {
      ...data,
    };

    if (type_stat) {
      updateData.type_stat = {
        connect: { id: type_stat.id },
      };
    }

    return this.episodesService.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.episodesService.deleteEpisode({
      where: { id: Number(id) },
    });
  }
}
