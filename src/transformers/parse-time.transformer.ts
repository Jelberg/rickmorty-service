import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export function ParseTime() {
  return Transform(({ value }) => {
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
  });
}
