import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested } from 'class-validator';

class TypeStatDto {
  @IsNumber()
  @ApiProperty({ description: 'ID of the TypeStat' })
  id: number;
}

export class CreateCharacterDto {
  @ApiProperty({ description: 'Episode name' })
  name: string;

  @ApiProperty({ description: 'ID of the TypeStat' })
  @ValidateNested()
  @Type(() => TypeStatDto)
  type_stat: TypeStatDto;
}
