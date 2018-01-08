import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IcurrentUser } from '../../shared/models/icurrent-user';

@Injectable()
export class AuthService {

private _url = 'http://192.168.7.80:3000/api/sign-in';
userProfile: any;
loggedIn: boolean;
loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private _http: HttpClient) {
    if (this._hasToken) {
      this.userProfile = this._getCurrentUser();
      this._setLoggedIn(true);
    }else if (!this._hasToken) {
      this.logout();
    }
  }

  login(payload): Observable<IcurrentUser> {
    return this._http.post<IcurrentUser>( this._url, payload)
    .do((response: IcurrentUser) => {
      if (response && response.auth_token) {
        localStorage.setItem('currentUser', JSON.stringify(response)); /* have to verify before using localstorage */
        this._setLoggedIn(true);
        this.userProfile = this._getCurrentUser();
      }
    })
    .catch(this._handleError);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.userProfile = undefined;
    this._setLoggedIn(false);
  }

  private _setLoggedIn(value: boolean): void {
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  private _getCurrentUser(): any {
      return JSON.parse(localStorage.getItem('currentUser'));
  }

  private get _hasToken(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  private _handleError(err: HttpErrorResponse): ErrorObservable {
    if (err.status === 401) {
      return Observable.throw(err.error.errors[0].detail);
    }
    return Observable.throw(err);
  }

}
