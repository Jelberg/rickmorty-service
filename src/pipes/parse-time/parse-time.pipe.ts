import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseTimePipe implements PipeTransform {
  transform(value: string) {
    const parsedTime = this.parseTime(value);
    if (!parsedTime) {
      throw new BadRequestException(
        'Invalid time format. Expected format MM:SS and not greater than 60:00',
      );
    }
    return parsedTime;
  }

  private parseTime(timeString: string) {
    const timeParts = timeString.split(':');
    if (timeParts.length !== 2) {
      return null;
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
      return null;
    }

    return { minutes, seconds };
  }
}
