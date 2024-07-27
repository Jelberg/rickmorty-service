import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SeasonEpisodePipe implements PipeTransform {
  transform(value: string): { season: string; episode: string } {
    if (typeof value !== 'string') {
      throw new BadRequestException('Episode must be a string');
    }

    // Extrae la temporada y el episodio usando un enfoque más explícito
    const seasonPart = value.substring(0, 3); // Ej. 'S01'
    const episodePart = value.substring(3); // Ej. 'E04'

    // Verifica el formato de la temporada y episodio
    if (!/^S\d{2}$/.test(seasonPart) || !/^E\d{1,2}$/.test(episodePart)) {
      throw new BadRequestException(
        'Invalid episode format. Expected format is SxxExx.',
      );
    }

    return { season: seasonPart, episode: value };
  }
}
