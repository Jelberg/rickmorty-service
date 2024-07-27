import { IsString, IsNumber, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ParseTime } from 'src/transformers/parse-time.transformer';

class TypeStatDto {
  @IsNumber()
  @ApiProperty({ description: 'ID of the TypeStat' })
  id: number;
}

export class CreateEpisodeDto {
  @ApiProperty({ description: 'Epidsode name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Season and chapter string' })
  @IsString()
  episode: string;

  @ApiProperty({ description: 'Duration in minutes (max 60)' })
  @Max(60)
  @IsNumber()
  duration: number;

  @IsString()
  @ParseTime()
  @ApiProperty({ description: 'Time initial paricipation (formart MM:SS)' })
  time_init: string;

  @IsString()
  @ParseTime()
  @ApiProperty({ description: 'Time final paricipation (formart MM:SS)' })
  time_finish: string;

  @ApiProperty({ description: 'ID of the TypeStat' })
  @ValidateNested()
  @Type(() => TypeStatDto)
  type_stat: TypeStatDto;
}
