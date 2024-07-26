import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class TypeStatDto {
  @IsNumber()
  @ApiProperty({ description: 'ID of the TypeStat' })
  id: number;
}

export class CreateCharacterDto {
  @IsString()
  @ApiProperty({ description: 'Character name' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Character specie name' })
  specie: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Character type' })
  type?: string;

  @IsOptional()
  @ApiProperty({ description: 'ID of the TypeStat' })
  @ValidateNested()
  @Type(() => TypeStatDto)
  type_stat?: TypeStatDto;
}
