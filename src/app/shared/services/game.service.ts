import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  state: string = 'READY';
  clicks: number = 0;
  time: number = 200;
  private stateSource = new Subject<string>();
  stateChange$ = this.stateSource.asObservable();
  private clicksSource = new Subject<number>();
  clicksChange$ = this.clicksSource.asObservable();

  constructor(private timerService: TimerService) {}

  statusChanged(state: string) {
    this.stateSource.next(state);
    this.state = state;
  }

  clicksChanged(clicks: number) {
    this.clicksSource.next(clicks);
  }

  newGame() {
    this.clicks = 0;
    this.statusChanged('READY');
  }

  startGame() {
    this.timerService.setInitialTime(this.time);
    this.timerService.resetTimer();
    this.timerService.startTimer();
    this.statusChanged('RUNNING');
  }

  pauseGame() {
    this.timerService.pauseTimer();
    this.statusChanged('PAUSED');
  }

  resumeGame() {
    this.timerService.startTimer();
    this.statusChanged('RUNNING');
  }

  endGame() {
    this.timerService.stopTimer();
    this.statusChanged('FINISHED');
  }

  click() {
    this.clicks++;
    this.clicksChanged(this.clicks);
  }

  getState() {
    return this.state;
  }

  getClicks() {
    return this.clicks;
  }

  getTime() {
    return this.time;
  }
}
