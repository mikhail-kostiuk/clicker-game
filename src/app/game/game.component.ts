import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  username: string;
  clicks: number;
  time: number;
  state: string = 'READY';
  timer: number;

  constructor() {}

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('username'));
    this.newGame();
  }

  newGame() {
    this.clicks = 0;
    this.time = 10;
    this.state = 'READY';
  }

  startGame() {
    this.state = 'RUNNING';
    this.timer = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    this.state = 'FINISHED';
    clearInterval(this.timer);
  }

  click() {
    this.clicks++;
  }
}
