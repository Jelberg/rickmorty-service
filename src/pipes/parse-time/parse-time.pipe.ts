import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseTimePipe implements PipeTransform {
  transform(value: string): { minutes: number; seconds: number } {
    if (typeof value !== 'string') {
      throw new BadRequestException('Time must be a string');
    }
    const timeParts = value.split(':');
    if (timeParts.length !== 2) {
      throw new BadRequestException(
        'Invalid time format. Expected format MM:SS',
      );
    }

    const minutes = parseInt(timeParts[0], 10);
    const seconds = parseInt(timeParts[1], 10);

    if (
      isNaN(minutes) ||
      isNaN(seconds) ||
      minutes < 0 ||
      minutes > 60 ||
      seconds < 0 ||
      seconds >= 60 ||
      (minutes === 60 && seconds !== 0)
    ) {
      throw new BadRequestException(
        'Invalid time format. Expected format MM:SS and not greater than 60:00',
      );
    }

    return { minutes, seconds };
  }
}
