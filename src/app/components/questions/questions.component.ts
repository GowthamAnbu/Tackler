import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import { MatDialog, MatSnackBar} from '@angular/material';

import { Iquestion, Iquestions} from '../../interfaces/iquestion';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {

private _ticks: number;
private _counter: number;
private _subject: Subject<any>;
minutesDisplay: number;
hoursDisplay: number;
secondsDisplay: number;

private _postData: PostData;
private _index: number;
questions: Iquestion;
private _answerChanged = false;

  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _questionService: QuestionService) { }

  ngOnInit() {
    this._getQuestions();
    if (this.isTestTaken()) {
      this._refresh();
  }
  }

  private _refresh() {
    this._getQuestions();
    this._setIndex(0);
    this._startTimer(this.questions.current_time, this.questions.end_time);
  }

  private _setIndex(indexValue: number) {
    this._index = indexValue;
    this._answerChanged = false;
  }

  getIndex(): number {
    return this._index;
  }

  private _getCounter(startTime: string, endTime: string): number {
    const _s = new Date(startTime);
    const _e = new Date(endTime);
    const result: number =  (_e.getTime() - _s.getTime()) / 1000 ; // result is in seconds
    return result;
  }

  private _setTimerProperties(counter: number): void {
    this._ticks = 0;
    this._counter = counter;
    this.minutesDisplay = this.hoursDisplay = this.secondsDisplay = 0;
    this._subject = new Subject();
  }

  private _resetTimerProperties(): void {
    // have to reset intial value and counter
    this._ticks = this._counter = this.minutesDisplay = this.hoursDisplay = this.secondsDisplay = 0;
  }

  private _startTimer(startTime: string, endTime: string) {
    const counter = this._getCounter(startTime, endTime);
    if (counter <= 0) {
      this._redirect();
      this.snackBar.open('Do not worry your answers are automatically SAVED and your TIME is OVER', 'success', {
        duration: 15000,
      });
      return;
    }
    this._setTimerProperties(counter);
    const timer = Observable.timer(1, 1000);
    timer
    .take(this._counter)
    .takeUntil(this._subject)
    .map(() => --this._counter)
    .subscribe(t => this._timer(t));
  }

  private _timer(tick) {
    this._ticks = tick;
    this.hoursDisplay = this._getHours(this._ticks);
    this.minutesDisplay = this._getMinutes(this._ticks);
    this.secondsDisplay = this._getSeconds(this._ticks);
    if (this._counter === 0) {
      this._redirect();
      this.snackBar.open('Do not worry your answers are automatically SAVED and your TIME is OVER', 'success', {
        duration: 15000,
      });
    }
  }

  private _redirect() {
    this._submit(this.getIndex()); // can create a function to post all answers array :)
    this._finalHit();
    this._stopTimer();
    this._router.navigateByUrl('/rounds/1');
  }

  private _getSeconds(ticks: number) {
    return this._padding(ticks % 60);
  }

  private _getMinutes(ticks: number) {
    return this._padding((Math.floor(ticks / 60)) % 60);
  }

  private _getHours(ticks: number) {
    return this._padding(Math.floor((ticks / 60) / 60));
  }

  private _padding(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }

  /* returns the initial question object => changed the data to be obtained from service since this page reloads on every */
  private _getQuestions() {
    // this.questions = this._activatedRoute.snapshot.data['roundQuestions']; console.log(this.questions);
    this._questionService.getQuestions(+this._activatedRoute.snapshot.paramMap.get('id'))
    .subscribe(
      data => {
        this.questions = data;
        console.log(this.questions);
      },
      err => {
        this.questions = undefined;
        console.log('err'); // have to do something here
      }
    );
  }

  /* Helper function for UI */
  isTestTaken(): boolean {
    return this.questions.start_time !== '';
  }

  /**
   * initial function called by button click Take Test
   * toggles testTaken for UI */
  // couldn't test it right now because of dynamic changes
  takeTest(): void {
    this._setIndex(0);
    this._initialHit();
    this._getQuestions();
    this._startTimer(this.questions.start_time, this.questions.end_time);
  }

  /* timer hit after taking the test for security reasons */
  private _initialHit(): void {
    console.log('intial timer Hit'); // sets the timer here
  }

  /* final timer hit to represent end of test */
  private _finalHit(): void {
    console.log('final timer Hit');
  }

  /**
   * sets the global index
   * tiny little function BIG responsibility  */
  goto(index: number): void {
    this._setIndex(index);
  }

  /** submits data and increase index */
  next(index: number) {
    this._submit(index);
    ++index;
    this.goto(index);
  }

  /** submits the answer by setting answer followed by calling the service function*/
  private _submit(index: number): void {
    if (!this._answerChanged) {
      // console.log('already answered by clicking the radio button for id =>', this.questions.questions[index].question_id);
      return ;
    }
    const data: PostData = this._setPostAnswer(index);
    this._serviceCall(data);
  }

  /* public function to be called by UI which sets the answer string */
  setAnswer(answer: string): void {
    // for the special guy textarea who uses ngmodel
    if (answer === '') {
      this._answerChanged = true;
      return;
    }
    const id = this.getIndex();
    if (this.questions.questions[id].answer !== answer) {
      this._answerChanged = true;
      this.questions.questions[id].answer = answer;
    }
  }

  /* sets the PostAnswer */
  private _setPostAnswer(index: number): PostData {
    const _questionId = this._getQuestionId(index);
    this._postData = {
      round_id: this.questions.round_id,
      question_id: _questionId,
      answer: this.questions.questions[index].answer
    };
    return this._postData;
  }

  /** gets the questionId based on the index given */
  private _getQuestionId(index: number): number {
    return this.questions.questions[index].question_id;
  }

  private _stopTimer() {
    this._subject.next();
    this._resetTimerProperties();
  }

  /** actual api hit or service call  */
  private _serviceCall(payload: PostData): void {
    console.log(payload);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitDialogComponent, {
      height: '250px',
      width: '500px',
      data: this._getUnansweredNoOfQuestions()
    });

    dialogRef.afterClosed().subscribe(result => {
      this._afterClosed(result);
    });
  }

  private _getUnansweredNoOfQuestions(): number {
    return this.questions.questions.filter( answer => answer.answer === '').length;
  }

  private _afterClosed(result: boolean): void {
    if (result === true) {
      this._redirect();
      this.snackBar.open('your answers are SAVED and you are redirected successfully', 'success', {
        duration: 15000,
      });
    }
  }

  /* ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.removeLocalTestTaken();
  } */

}

export interface PostData {
  round_id: number;
  question_id: number;
  answer: string;
}
