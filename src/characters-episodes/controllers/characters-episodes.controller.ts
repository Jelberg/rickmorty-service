import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
    console.log(createCharactersEpisodeDto);
    // return this.charactersEpisodesService.create({
    //   duration: createCharactersEpisodeDto.duration,
    //   characters: { connect: { id: createCharactersEpisodeDto.fk_char } },
    //   episodes: { connect: { id: createCharactersEpisodeDto.fk_epis } },
    //   times: { connect: { id: createCharactersEpisodeDto.fk_time } },
    // });
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
    return this.charactersEpisodesService.remove({ id: Number(id) });
  }
}
