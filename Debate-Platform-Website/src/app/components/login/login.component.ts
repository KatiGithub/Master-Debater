import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  loginWithGoogle() {
    this.auth.doGoogleLogin().then((data) => {
      console.log(data);
    });
  }

  login() {
    console.log('normal logging in not yet implemented');
  }
}
