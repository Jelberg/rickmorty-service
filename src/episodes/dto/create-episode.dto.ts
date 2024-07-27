import { IsObject, IsString, IsNumber, Max, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SeasonEpisodePipe } from 'src/pipes/season-episode/season-episode.pipe';
import { Transform, Type } from 'class-transformer';
import { STATUS } from 'src/commons/enum';

export class CreateEpisodeDto {
  @ApiProperty({ description: 'Episode name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Season and episode string in format S01E04' })
  @IsObject()
  @Transform(({ value }) => {
    const pipe = new SeasonEpisodePipe(); // O el pipe que hayas creado
    return pipe.transform(value);
  })
  @Type(() => Object) // Indica que esperamos un objeto
  episode: { season: string; episode: string };

  @ApiProperty({ description: 'Duration in minutes (max 60)' })
  @IsNumber()
  @Max(60)
  duration: number;

  @ApiProperty({ description: 'Status of the episode' })
  @IsString()
  @IsIn([STATUS.ACTIVE, STATUS.SUSPENDED])
  status: string;
}
