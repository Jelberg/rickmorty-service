import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsObject, Validate } from 'class-validator';
import { ParseTimePipe } from 'src/pipes/parse-time/parse-time.pipe';
import { IsTimeLessThan } from 'src/validators/isTimeLessThan';

export class TimesDto {}
export class CreateCharactersEpisodeDto {
  @IsNumber()
  @ApiProperty({ description: 'ID of the Character' })
  fk_char: number;

  @IsNumber()
  @ApiProperty({ description: 'ID of the Episode' })
  fk_epis: number;

  // TODO: Cambiar a arreglo de MM:SS, pero el pipe no se active cuando paso TimesDto
  @ApiProperty({ description: 'Time init participation', example: '20:04' })
  @IsObject()
  @Transform(({ value }) => {
    const pipe = new ParseTimePipe();
    return pipe.transform(value);
  })
  @Type(() => Object)
  @Validate(IsTimeLessThan, ['time_finish'], {
    message: 'Time init must be less than time finish !!',
  })
  time_init: { minutes: number; seconds: number; value: string };

  @ApiProperty({ description: 'Time finish participation', example: '20:04' })
  @IsObject()
  @Transform(({ value }) => {
    const pipe = new ParseTimePipe();
    return pipe.transform(value);
  })
  @Type(() => Object)
  time_finish: { minutes: number; seconds: number; value: string };
}
