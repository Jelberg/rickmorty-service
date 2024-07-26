import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateCharactersEpisodeDto {
  @IsNumber()
  @ApiProperty({ description: 'ID of the Character' })
  fk_char: number;

  @IsNumber()
  @ApiProperty({ description: 'ID of the time Register' })
  fk_time: number;

  @IsNumber()
  @ApiProperty({ description: 'ID of the Episode' })
  fk_epis: number;

  @IsNumber()
  @ApiProperty({ description: 'Duration in minutes' })
  duration: number;
}
