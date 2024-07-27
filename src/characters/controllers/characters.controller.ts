import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CharactersService } from '../services/characters.service';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('characters')
@ApiTags('Characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new character' })
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all characters with pagination' })
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
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 5,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
  ) {
    const parsedCursor = cursor ? JSON.parse(cursor) : undefined;
    const parsedWhere = where ? JSON.parse(where) : undefined;
    const parsedOrderBy = orderBy ? JSON.parse(orderBy) : undefined;
    return this.charactersService.findAll({
      page: Number(page),
      pageSize: Number(pageSize),
      cursor: parsedCursor,
      where: parsedWhere,
      orderBy: parsedOrderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a character' })
  update(
    @Param('id') id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Patch('delete/:id')
  @ApiOperation({
    summary: 'Delete: change status to suspended by character id',
  })
  remove(@Param('id') id: string) {
    return this.charactersService.deleteCharacter({
      where: { id: Number(id) },
    });
  }
}
