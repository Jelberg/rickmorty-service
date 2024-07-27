import { PartialType } from '@nestjs/swagger';
import { CreateCharactersEpisodeDto } from './create-characters-episode.dto';

export class UpdateCharactersEpisodeDto extends PartialType(
  CreateCharactersEpisodeDto,
) {}
