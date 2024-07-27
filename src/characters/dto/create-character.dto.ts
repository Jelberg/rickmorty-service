//Import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsIn, IsOptional, IsString } from 'class-validator';
import { STATUS } from 'src/commons/enum';

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
  @ApiProperty({ description: 'Character status (active or suspended)' })
  status_char?: string;

  /*@IsOptional()
  @ApiProperty({ description: 'ID of the TypeStat' })
  @ValidateNested()
  @Type(() => TypeStatDto)
  type_stat?: TypeStatDto;*/
}
