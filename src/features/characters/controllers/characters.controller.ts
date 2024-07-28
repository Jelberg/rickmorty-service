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
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

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
  @ApiOperation({ summary: 'Get all character with pagination' })
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
    return this.charactersService.findAll({
      page: pageNumber,
      pageSize: pageSizeNumber,
      cursor: parsedCursor,
      where: parsedWhere,
      orderBy: parsedOrderBy,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Get(':specie/:type?')
  @ApiOperation({ summary: 'Find characters by specie and type' })
  @ApiParam({
    name: 'specie',
    required: true,
    description: 'Specie of the character',
  })
  @ApiParam({
    name: 'type',
    required: false,
    description: 'Type of the character (optional)',
    schema: { type: 'string', nullable: true },
  })
  find(@Param('specie') specie: string, @Param('type') type?: string) {
    type = type === '{type}' ? undefined : type; // Para que pueda funcionar desde swagger cuando no se envia el parametro
    return this.charactersService.find(specie, type);
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
