import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(time: number): string {
    const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = (time % 60).toFixed(1);
    const secondsStr =
      parseInt(seconds, 10) < 10 ? `0${seconds}` : `${seconds}`;

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }
}
