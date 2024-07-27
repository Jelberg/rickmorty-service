import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { EpisodesService } from '../services/episodes.service';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { UpdateEpisodeDto } from '../dto/update-episode.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('episodes')
@ApiTags('Episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new episodes' })
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all episodes with pagination' })
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

    return this.episodesService.findAll({
      page: pageNumber,
      pageSize: pageSizeNumber,
      cursor: parsedCursor,
      where: parsedWhere,
      orderBy: parsedOrderBy,
    });
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
    const { status, ...data } = updateEpisodeDto;

    const updateData: any = {
      ...data,
    };
    //TODO: Revisar si se puede hacer con el update
    /*if (status) {
      updateData.type_stat = {
        connect: { id: status.id },
      };
    }*/

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
