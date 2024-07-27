import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { CharactersEpisodesService } from '../services/characters-episodes.service';
import { CreateCharactersEpisodeDto } from '../dto/create-characters-episode.dto';
import { UpdateCharactersEpisodeDto } from '../dto/update-characters-episode.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

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

  @Get()
  @ApiOperation({ summary: 'Get all Episodes x Characters with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    type: String,
    description: 'Cursor for pagination',
  })
  @ApiQuery({
    name: 'where',
    required: false,
    type: String,
    description: 'Filter conditions in JSON format',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: String,
    description: 'Sorting conditions in JSON format',
  })
  findAll(
    @Query('page') page: string = '1',
    @Query('pageSize') pageSize: string = '5',
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    const parsedCursor = cursor ? JSON.parse(cursor) : undefined;
    const parsedWhere = where ? JSON.parse(where) : undefined;
    const parsedOrderBy = orderBy ? JSON.parse(orderBy) : undefined;
    return this.charactersEpisodesService.findAll({
      page: pageNumber,
      pageSize: pageSizeNumber,
      cursor: parsedCursor,
      where: parsedWhere,
      orderBy: parsedOrderBy,
    });
  }
}
