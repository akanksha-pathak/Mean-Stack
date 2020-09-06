import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: any = new Object();



  firstName: string;
  lastName: string;
  userNameR: any;
  Email: string;
  password: any;
  passwordR: any;
  number: any;

  statusF: any;


  constructor(private http: HttpClient, private router: Router) {
    if (!sessionStorage.getItem('key')) {
      this.router.navigate(['4']);
    } else if (sessionStorage.getItem('key') == '1') {
      this.router.navigate(['11']);
    } else if (sessionStorage.getItem('key') == '0') {
      this.router.navigate(['']);
    }
  }

  async Register() {

    this.statusF = await this.http.post('http://localhost:8080/signup', this.user).toPromise();
    console.log(this.statusF);
    if (this.statusF.message == 'success') {
      alert("Account Has Been Created !!! Redirecting To LogIn Page");
      this.router.navigate(['3']);
    }
    if (this.statusF.message == 'failed') {

      alert("Email Id Already Registered , Account Not created !!! Please Try Again");

      window.location.reload();
    }
  }

  async ngOnInit(): Promise<void> {
    console.log(this.router);


  }

  signint() {
    this.router.navigate(['3']);
  }

}
