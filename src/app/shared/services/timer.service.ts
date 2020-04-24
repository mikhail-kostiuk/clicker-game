import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  initialTime: number = 0;
  currentTime: number = 0;
  timerId: any;
  private timeSource = new Subject<number>();
  timeChange$ = this.timeSource.asObservable();

  constructor() {}

  timeChanged(time: number) {
    this.timeSource.next(time);
  }

  startTimer(): any {
    this.timerId = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime--;
        this.timeChanged(this.currentTime);
      } else {
        this.timeChanged(0);
        this.stopTimer();
      }
    }, 1000);
  }

  pauseTimer(): void {
    clearInterval(this.timerId);
  }

  stopTimer(): void {
    clearInterval(this.timerId);
    this.currentTime = 0;
  }

  resetTimer(): void {
    this.currentTime = this.initialTime;
  }

  setInitialTime(time: number): void {
    this.initialTime = time;
  }
}
