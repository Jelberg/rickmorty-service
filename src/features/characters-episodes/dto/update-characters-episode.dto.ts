import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsObject, Validate } from 'class-validator';
import { ParseTimePipe } from 'src/pipes/parse-time/parse-time.pipe';
import { IsTimeLessThan } from 'src/validators/isTimeLessThan';

export class UpdateCharactersEpisodeDto {
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

  @ApiProperty({ description: 'Time finish participation', example: '21:04' })
  @IsObject()
  @Transform(({ value }) => {
    const pipe = new ParseTimePipe();
    return pipe.transform(value);
  })
  @Type(() => Object)
  time_finish: { minutes: number; seconds: number; value: string };
}
