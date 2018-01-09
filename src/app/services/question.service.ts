import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/of';

import { InterviewRound } from '../interfaces/interview-round';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class QuestionService {
private _url = '';

constructor(private _http: HttpClient, private _authService: AuthService) { }

  private _getQuestionsUrl(interviewId: string, interviewRoundId: string, auth_token: string): string {
    let url = 'http://192.168.7.80:3000/api/interviews/';
    url += '' + interviewId + '' + '/interview_rounds/' + ''
    + interviewRoundId + '?auth_token=' + '' + auth_token;
    return url;
  }

  getQuestions(interviewId: string, interviewRoundId: string): Observable<InterviewRound> {
    this._url = this._getQuestionsUrl(interviewId, interviewRoundId, this._authService.userProfile.auth_token);
    return this._http.get(this._url)
    .catch(this._handleError);
  }

  private _getTimerUrl(interviewId: string, interviewRoundId: string): string {
    let url = 'http://192.168.7.80:3000/api/interviews/';
    url += '' + interviewId + '' + '/interview_rounds/' + ''
    + interviewRoundId;
    console.log('_getTimerUrl is: ' + url);
    return url;
  }

  startInterview(interviewId: string, interviewRoundId: string): Observable<void> {
    this._url = this._getTimerUrl(interviewId, interviewRoundId);
    let params = new HttpParams();
    params = params.append('auth_token', this._authService.userProfile.auth_token);
    params = params.append('start_at', 'true');
    console.log('initial timer Hit');
    return this._http.put(this._url, params )
    .do(
      data => console.log('inside startInterview: ' + data)
    )
    .catch(this._handleError);
  }

  completeInterview(interviewId: string, interviewRoundId: string): Observable<void> {
    this._url = this._getTimerUrl(interviewId, interviewRoundId);
    let params = new HttpParams();
    params = params.append('auth_token', this._authService.userProfile.auth_token);
    params = params.append('end_at', 'true');
    console.log('final timer Hit');
    return this._http.put(this._url, params )
    .do(
      data => console.log('inside completeInterview: ' + data)
    )
    .catch(this._handleError);
  }

  private _getAnswerUrl(interviewId: string,
    interviewRoundId: string,
    interviewQuestionId: string): string {
    let url = `http://192.168.7.80:3000/api/interviews/`;
    url += '' + interviewId + '' + '/interview_rounds/' + ''
    + interviewRoundId + '' + '/interview_questions/' + interviewQuestionId;
    console.log('_getAnswerUrl is: ' + url);
    return url;
  }

  submitAnswer(interviewId: string, interviewRoundId: string, interviewQuestionId: string, answer: string): Observable<void> {
    this._url = this._getAnswerUrl(interviewId, interviewRoundId, interviewQuestionId);
    let params = new HttpParams();
    params = params.append('auth_token', this._authService.userProfile.auth_token);
    params = params.append('answer', answer);
    return this._http.put(this._url, params)
    .do(
      data => console.log('inside submitAnswer: ' + data)
    )
    .catch(this._handleError);
  }

  private _handleError(err: HttpErrorResponse): ErrorObservable {
    console.log('err in question service');
    if (err.status === 401) {
      return Observable.throw(err);
    }
    return Observable.throw(err);
  }

}
