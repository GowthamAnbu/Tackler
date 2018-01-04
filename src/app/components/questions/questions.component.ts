import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';

import { Iquestion, Iquestions} from '../../interfaces/iquestion';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {

private _ticks: number;
private _initialvalue: number;
private _counter: number;
private _subject: Subject<any>;
minutesDisplay: number;
hoursDisplay: number;
secondsDisplay: number;

private _testTaken = false;
private _postData: PostData;
private _index: number;
questions: Iquestion;
private _answerChanged = false;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._getQuestions();
    this._index = 0;
  }

  private _setIndex(indexValue: number) {
    this._index = indexValue;
    this._answerChanged = false;
  }

  getIndex(): number {
    return this._index;
  }

  private _setTimerProperties(): void {
    this._ticks = 0;
    this._initialvalue = this.questions.duration;
    this._counter = this._initialvalue * 60;
    this.minutesDisplay = this.hoursDisplay = this.secondsDisplay = 0;
    this._subject = new Subject();
  }

  private _resetTimerProperties(): void {
    this._ticks = this._initialvalue = this._counter = this.minutesDisplay = this.hoursDisplay = this.secondsDisplay = 0;
  }

  private _startTimer() {
    this._setTimerProperties();
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
      this._finalHit();
    }
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

  /** returns the initial question object  */
  private _getQuestions() {
    this.questions = this._activatedRoute.snapshot.data['roundQuestions']; console.log(this.questions);
  }

  /* Helper function for UI */
  isTestTaken(): boolean {
    return this._testTaken;
  }

  /**
   * initial function called by button click Take Test
   * toggles testTaken for UI */
  takeTest(): void {
    this._initialHit();
    this._testTaken = !this._testTaken;
    this._startTimer();
  }

  /* timer hit after taking the test for security reasons */
  private _initialHit(): void {
    console.log('intial timer Hit');
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

  /** function called by UI to submit last answer  */
  lastSubmit(index: number): void {
    this._submit(index);
    this._subject.next();
    this._resetTimerProperties();
    // have to create that popup here
  }

  /** actual api hit or service call  */
  private _serviceCall(payload: PostData): void {
    console.log(payload);
  }
}

export interface PostData {
  round_id: number;
  question_id: number;
  answer: string;
}
