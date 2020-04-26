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
    const gameClicksSub = gameService.clicksChange$.subscribe((clicks) => {
      this.clicks = clicks;
    });
    this.subscriptions.push(gameStateSub, timerTimeSub, gameClicksSub);
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

  startGame(): void {
    this.gameService.startGame();
    this.timerService.setInitialTime(this.time);
    this.timerService.resetTimer();
    this.timerService.startTimer();
  }

  pauseGame(): void {
    this.gameService.pauseGame();
    this.timerService.pauseTimer();
  }

  resumeGame(): void {
    this.gameService.startGame();
    this.timerService.startTimer();
  }

  endGame(): void {
    this.gameService.endGame();
    this.timerService.stopTimer();
  }

  onClick(): void {
    this.gameService.click();
  }
}
