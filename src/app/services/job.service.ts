import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Ijob } from '../interfaces/ijob';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class JobService {
private _url = 'http://192.168.7.80:3000/api/interviews';

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getJobs(): Observable<Ijob[]> {
    const params = new HttpParams().set('auth_token', this._authService.userProfile.auth_token);
    return this._http.get<Ijob[]>(this._url, {params} )
    .catch(this._handleError);
  }

  private _handleError(err: HttpErrorResponse): ErrorObservable {
    if (err.status === 401) {
      return Observable.throw(err.error.errors[0].detail);
    }
    return Observable.throw(err);
  }
}
