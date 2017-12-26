import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IcurrentUser } from '../../shared/models/icurrent-user';
@Injectable()
export class AuthService {

private _url = 'http://localhost:3030/login';
private payload;
isLoggedin = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private _http: HttpClient) {}

  login(email: String, password: string): Observable<any> {
    this.payload = {email: email, password: password};
    return this._http.post( this._url, this.payload)
    .map((response: IcurrentUser) => {
      const user = response;
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }
    )
    .do( response => {
      this.isLoggedin.next(true);
      // console.log(JSON.stringify(response));
      }
    )
    .catch(this.handleError);
  }

  isAuthenticated(): Observable<boolean > {
    return this.isLoggedin.asObservable();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedin.next(false);
  }

  getCurrentUser(): any {
      return JSON.parse(localStorage.getItem('currentUser'));
  }

  private handleError(err: HttpErrorResponse) {
    let error: Error;
    if (err.status === 400) {
      error = new Error('400');
    }
    console.log(err.message);
    return Observable.throw(error.message);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('currentUser');
  }

}
