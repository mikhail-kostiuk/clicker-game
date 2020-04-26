import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/shared/services/game.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  user: User;
  clicks: number;

  constructor(
    private router: Router,
    private gameService: GameService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.clicks = this.gameService.getClicks();
  }

  newGame(): void {
    this.gameService.newGame();
    this.router.navigate(['/game']);
  }
}
