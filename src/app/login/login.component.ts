import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: SocialAuthService) {}
  ngOnInit(): void {}

  googleLoginOptions = {
    scope: 'profile email',
  };

  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions)
      .then((data) => {
        console.log(data);
      })
      .catch((data) => {
        this.authService.signOut();
      });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
