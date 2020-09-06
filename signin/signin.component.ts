// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { HeaderUpdateService } from '../../header-update.service';
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';



// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.scss']
// })
// export class SigninComponent implements OnInit {
//   userName: string;
//   password: string;
//   loginData: any;

//   socialUser: SocialUser;
//   loggedIn: boolean;

//   user: any = new Object();
//   constructor(private http: HttpClient, private router: Router, private headerUpdate: HeaderUpdateService, private authService: SocialAuthService) {

//     if (!sessionStorage.getItem('key')) {
//       this.router.navigate(['3']);
//     } else {
//       this.router.navigate(['/']);
//     }


//   }
//   ngOnInit(): void {
//     this.authService.authState.subscribe((user) => {
//       this.socialUser = user;
//       this.loggedIn = (user != null);
//       console.log(this.user);
//     });
//   }
//   async signin() {
//     const values = {
//       userName: this.userName,
//       password: this.password
//     }


//     this.loginData = await this.http.post('http://localhost:8080/signin', this.user).toPromise();
//     console.log(this.loginData);

//     if (this.loginData.roleid == 1) {
//       sessionStorage.setItem('key', this.loginData.roleid);
//       this.headerUpdate.hide.next(true);
//       this.router.navigate(['11']);
//       console.log("admin");
//     } else if (this.loginData.roleid == 0) {
//       sessionStorage.setItem('key', this.loginData.roleid);
//       this.headerUpdate.hide.next(true);
//       this.router.navigate(['2']);

//     } else {
//       alert("Wrong credential");
//       window.location.reload();
//     }


//   }
//   register() {

//     this.router.navigate(['4'])
//   }

//   forgetp() {
//     this.router.navigate(['5']);
//   }


//   // onSignIn(googleUser) {
//   //   var profile = googleUser.getBasicProfile();
//   //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   //   console.log('Name: ' + profile.getName());
//   //   console.log('Image URL: ' + profile.getImageUrl());
//   //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   // }

//   signInWithGoogle(): void {
//     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderUpdateService } from '../../header-update.service';

import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  userName: string;
  password: string;
  loginData: any;
  socialUser: SocialUser;
  loggedIn: boolean;
  user: any = new Object();
  constructor(
    private http: HttpClient,
    private router: Router,
    private headerUpdate: HeaderUpdateService,
    private authService: SocialAuthService,
    private updateHeader: HeaderUpdateService
  ) {
    if (!sessionStorage.getItem('key')) {
      this.router.navigate(['3']);
    } else {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      if (!user) {


        this.updateHeader.hide.next(false
        );
        sessionStorage.removeItem('key');

        return;

      }
      this.socialUser = user;
      this.loggedIn = user != null;
      sessionStorage.setItem('key', "1");// if logged in using google(admin)
      this.headerUpdate.hide.next(true);
      this.router.navigate(['11']);
    });
  }
  async signin() {
    const values = {
      userName: this.userName,
      password: this.password,
    };


    this.loginData = await this.http
      .post('http://localhost:8080/signin', this.user)
      .toPromise();
    console.log(this.loginData);

    if (this.loginData.roleid == 1) {
      sessionStorage.setItem('key', this.loginData.roleid);
      this.headerUpdate.hide.next(true);
      this.router.navigate(['11']);
      console.log('admin');
    } else if (this.loginData.roleid == 0) {
      sessionStorage.setItem('key', this.loginData.roleid);
      sessionStorage.setItem('del', this.loginData.email);

      this.headerUpdate.hide.next(true);
      this.router.navigate(['2']);
    } else {
      alert('Wrong credential');
      window.location.reload();
    }

  }
  register() {
    this.router.navigate(['4']);
  }

  forgetp() {
    this.router.navigate(['5']);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}