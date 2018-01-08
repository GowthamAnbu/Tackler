import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/of';

import { Iround } from '../interfaces/iround';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class RoundService {
private _url = '';

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  private _getRoundsUrl(id: string, auth_token: string): string {
    let url = 'http://192.168.7.80:3000/api/interviews/';
    url += '' + id + '' + '/interview_rounds?auth_token=' + '' + auth_token;
    return url;
  }

  getRounds(id: string): Observable<Iround> {
    this._url = this._getRoundsUrl(id, this._authService.userProfile.auth_token);
    return this._http.get(this._url)
    .catch(this._handleError);
  }

  private _handleError(err: HttpErrorResponse): ErrorObservable {
    if (err.status === 401) {
      return Observable.throw(err.error.errors[0].detail);
    }
    return Observable.throw(err);
  }

}
