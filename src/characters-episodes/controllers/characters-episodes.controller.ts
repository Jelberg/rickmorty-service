import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersEpisodesService } from '../services/characters-episodes.service';
import { CreateCharactersEpisodeDto } from '../dto/create-characters-episode.dto';
import { UpdateCharactersEpisodeDto } from '../dto/update-characters-episode.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('characters-episodes')
@ApiTags('Characters x Episodes')
export class CharactersEpisodesController {
  constructor(
    private readonly charactersEpisodesService: CharactersEpisodesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Characters x Episode' })
  create(@Body() createCharactersEpisodeDto: CreateCharactersEpisodeDto) {
    return this.charactersEpisodesService.create(createCharactersEpisodeDto);
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

  @Delete(':char_id/:epis_id')
  @ApiOperation({ summary: 'Remove a Characters x Episode' })
  remove(@Param('char_id') char_id: number, @Param('epis_id') epis_id: number) {
    return this.charactersEpisodesService.remove(char_id, epis_id);
  }
}
