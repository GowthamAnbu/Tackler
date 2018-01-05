import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
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

  constructor(public snackBar: MatSnackBar, private _authService: AuthService) { }

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
          // redirect here
          this.openSnackBar('Login Successful', 'success');
        },
        err => {
          // console.log('in component', err);
        }
      );
    }else {
      this.openSnackBar('Information Correction', 'Failed');
    }
  }
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
