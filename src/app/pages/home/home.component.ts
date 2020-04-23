import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      username: '',
    });
  }

  onSubmit(userData): void {
    const { username } = userData;

    localStorage.setItem('username', JSON.stringify(username));
    this.router.navigate(['/game']);
  }
}
