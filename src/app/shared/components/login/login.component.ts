import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide: Boolean = true;
  floatLabel = 'always';
  login: FormGroup;
  private _email: FormControl;
  private _password: FormControl;

  constructor(private _router: Router, public snackBar: MatSnackBar, private _authService: AuthService) { }

  ngOnInit() {
    this._setProperties();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private _setProperties() {
    this._email = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)]
    );
    this._password = new FormControl('', [Validators.required]);
    this.login = new FormGroup({
      email: this._email,
      password: this._password
    });
  }

  isValidEmail() {
    return this._email.valid || this._email.untouched;
  }

  isValidPassword() {
    return this._password.valid || this._password.untouched;
  }

  onSubmit(values): void {
    if (this.login.valid) {
      console.log(values);
      this._authService.login(values)
      .subscribe(
        data => {
          const auth_token: string = data.auth_token;
          this._router.navigate(['/dashboard/', auth_token]);
          this.openSnackBar('Login Successful', 'success');
        },
        err => {
          if (typeof(err) === 'string') {
            this.openSnackBar(err, 'Failed');
          }else {
            console.log(err);
          }
        }
      );
    }else {
      this.openSnackBar('Information Correction', 'Failed');
    }
  }
}

// tslint:disable-next-line:max-line-length
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
