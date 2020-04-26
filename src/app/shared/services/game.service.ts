import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  state: string = 'READY';
  clicks: number = 0;
  time: number = 10;
  private stateSource = new Subject<string>();
  stateChange$ = this.stateSource.asObservable();
  private clicksSource = new Subject<number>();
  clicksChange$ = this.clicksSource.asObservable();

  constructor() {}

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
    this.statusChanged('RUNNING');
  }

  pauseGame() {
    this.statusChanged('PAUSED');
  }

  endGame() {
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
