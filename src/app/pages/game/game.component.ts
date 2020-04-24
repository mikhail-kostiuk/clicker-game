import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/shared/services/game.service';
import { TimerService } from 'src/app/shared/services/timer.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  state: string;
  clicks: number;
  time: number;
  subscriptions: Subscription[] = [];

  constructor(
    private gameService: GameService,
    private timerService: TimerService,
    private router: Router
  ) {
    const gameStateSub = gameService.stateChange$.subscribe((state) => {
      this.state = state;
      if (state === 'FINISHED') {
        this.router.navigate(['result']);
      }
    });
    const timerTimeSub = timerService.timeChange$.subscribe((time) => {
      this.time = time;
      if (time === 0) {
        this.gameService.endGame();
      }
    });
    this.subscriptions.push(gameStateSub, timerTimeSub);
  }

  ngOnInit(): void {
    this.state = this.gameService.getState();
    this.clicks = this.gameService.getClicks();
    this.time = this.gameService.getTime();
  }

  ngOnDestroy(): void {
    this.gameService.endGame();
    this.timerService.stopTimer();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  startGame() {
    this.gameService.startGame();
    this.timerService.setInitialTime(this.time);
    this.timerService.resetTimer();
    this.timerService.startTimer();
    console.log(this.state);
  }

  pauseGame() {
    this.gameService.pauseGame();
    this.timerService.pauseTimer();
  }

  resumeGame() {
    this.gameService.startGame();
    this.timerService.startTimer();
  }

  onClick() {
    this.gameService.click();
    this.clicks = this.gameService.getClicks();
  }
}
