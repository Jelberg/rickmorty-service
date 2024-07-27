import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsObject } from 'class-validator';
import { ParseTimePipe } from 'src/pipes/parse-time/parse-time.pipe';

class TimeDto {
  @ApiProperty({ description: 'Minutes part of the time', example: 20 })
  @IsNumber()
  minutes: number;

  @ApiProperty({ description: 'Seconds part of the time', example: 30 })
  @IsNumber()
  seconds: number;
}

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

  @ApiProperty({ description: 'Time init participation', example: '20:04' })
  @IsObject()
  @Transform(({ value }) => {
    const pipe = new ParseTimePipe();
    return pipe.transform(value);
  })
  @Type(() => Object)
  time_init: { minutes: number; seconds: number };

  @ApiProperty({ description: 'Time finish participation', example: '20:04' })
  @IsObject()
  @Transform(({ value }) => {
    const pipe = new ParseTimePipe();
    return pipe.transform(value);
  })
  @Type(() => Object)
  time_finish: { minutes: number; seconds: number };
}
