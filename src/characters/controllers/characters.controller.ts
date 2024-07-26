import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CharactersService } from '../services/characters.service';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('characters')
@ApiTags('Characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create({
      name: createCharacterDto.name,
      type_stat: {
        connect: {
          id: createCharacterDto.type_stat.id,
        },
      },
    });
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Patch(':id')
  update(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('id') id: string,
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return;
    //return this.charactersService.update(+id, updateCharacterDto);
  }

  @Patch('delete/:id')
  remove(@Param('id') id: string) {
    return this.charactersService.deleteCharacter({
      where: { id: Number(id) },
    });
  }
}
