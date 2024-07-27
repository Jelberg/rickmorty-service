//Import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { STATUS } from 'src/commons/enum';

//eslint-disable-next-line
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
  @ApiProperty({ description: 'Character specie name Example: Human, Alien' })
  specie: string;

  @IsEmpty()
  @IsString()
  @ApiProperty({ description: 'Character type' })
  type: string;

  @IsOptional()
  @IsString()
  @IsIn([STATUS.ACTIVE, STATUS.SUSPENDED])
  @ApiProperty({ description: 'Character status' })
  status_char?: string;

  /*@IsOptional()
  @ApiProperty({ description: 'ID of the TypeStat' })
  @ValidateNested()
  @Type(() => TypeStatDto)
  type_stat?: TypeStatDto;*/
}
