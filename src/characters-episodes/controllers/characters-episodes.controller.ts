import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CharactersEpisodesService } from '../services/characters-episodes.service';
import { CreateCharactersEpisodeDto } from '../dto/create-characters-episode.dto';
import { UpdateCharactersEpisodeDto } from '../dto/update-characters-episode.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('characters-episodes')
@ApiTags('Characters x Episodes')
export class CharactersEpisodesController {
  constructor(
    private readonly charactersEpisodesService: CharactersEpisodesService,
  ) {}

  @Post()
  create(@Body() createCharactersEpisodeDto: CreateCharactersEpisodeDto) {
    return this.charactersEpisodesService.create({
      duration: createCharactersEpisodeDto.duration,
      characters: { connect: { id: createCharactersEpisodeDto.fk_char } },
      episodes: { connect: { id: createCharactersEpisodeDto.fk_epis } },
      times: { connect: { id: createCharactersEpisodeDto.fk_time } },
    });
  }

  @Get()
  findAll() {
    return this.charactersEpisodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersEpisodesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharactersEpisodeDto: UpdateCharactersEpisodeDto,
  ) {
    return this.charactersEpisodesService.update(
      +id,
      updateCharactersEpisodeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersEpisodesService.remove(+id);
  }
}
