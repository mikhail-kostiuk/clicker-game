import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onChange(value) {
    this.username = value;
  }

  onSubmit(event: CustomEvent): void {
    event.preventDefault();
    localStorage.setItem('username', JSON.stringify(this.username));
    this.router.navigate(['/game']);
  }
}
