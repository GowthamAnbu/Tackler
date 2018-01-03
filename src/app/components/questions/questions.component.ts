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

True = 'true';
False = 'false';

private _testTaken = false;
private _postData: PostData;
questions: Iquestion;
liveQuestion: LiveQuestion;
finalToggle = false;
answer: string;
// preview = false;
  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._getQuestions();
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
    this._setLiveQuestion(0);
    this._startTimer();
  }

  /* timer hit after taking the test for security reasons */
  private _initialHit(): void {
    console.log('intial timer Hit');
  }

  private _finalHit(): void {
    console.log('final timer Hit');
  }

  /** sets the liveQuestion based on the index given */
  private _setLiveQuestion(indexValue: number) {
    this.liveQuestion = {
      index: indexValue,
      question: this.questions.questions[indexValue]
    };
  }

  goto(index: number): void {
    /* const id = this._getQuestionId(index);
    if (this._isAnswered(id)) {
      this.preview = true;
    } */
    this._setLiveQuestion(index);
  }

  /** master Toggle controlling the liveQuestion to be viewed or not */
  toggle(index: number): void {
    const data: PostData = this._setLiveAnswer(index);
    this._serviceCall(data);
    index += 1;
    if (index === this.questions.questions.length) {
      this.finalToggle = true;
      this.liveQuestion = undefined;
      return;
    }
    this._setLiveQuestion(index);
    this.answer = undefined; // clear answer radiobutton cache for each question
  }

  /* public function to be called by html which sets the answer string */
  setAnswer(answer: string): void {
    this.answer = answer;
  }

  /* sets the liveAnswer array */
  private _setLiveAnswer(index: number): PostData {
    const _questionId = this._getQuestionId(index);
    // set answer to empty string if answer is not selected
    if (this.answer === undefined) {
      this.answer = this._getAnswer(_questionId);
    }
    /* this.liveAnswer = {
      question_id: this._getQuestionId(index),
      answer: this.answer.trim()
    }; */
    this._postData = {
      round_id: this.questions.round_id,
      question_id: _questionId,
      answer: this.answer
    };
    // console.log(`postData is `, this._postData); console.log(`index is ${index}`);
    return this._postData;
  }

  /** gets the questionId based on the index given */
  private _getQuestionId(index: number): number {
    return this.questions.questions[index].question_id;
  }

  /** gets the answer based on the question_id */
  private _getAnswer(question_id: number): string {
    const _answer = this.questions.questions.filter(answer => answer.question_id === question_id);
    if (_answer.length === 0) {
      return '';
    }
    return _answer[0].answer;
  }

  /* sets the final postData answers array based on the input */
  /* private _setPostData(payload: Answer): void {
    if (this._isAnswered(payload.question_id)) {
      console.log('ALREADY ANSWERED');
      const index = this._getIndexOfCurrentAnswer(payload);
      this._postData.answers[index] = payload;
    }else {
      this._postData.answers.push(payload);
    }
  } */

  /** returns the index of the search Element otherwise -1 */
  /* private _getIndexOfCurrentAnswer(searchElement: Ianswer): number {
    return this._postData.answers.indexOf(searchElement);
  } */

  /** returns true if question refferred by given id is already answered otherwise false */
  /* private _isAnswered(id: number): boolean {
    const filterData = this._postData.answers.filter(answer => answer.question_id === id);
    return filterData.length !== 0 ;
  } */

  /** things to do before hitting the api or service call  */
  finalSubmit(index: number): void {
    this.toggle(index);
    this._subject.next();
    this._resetTimerProperties();
    // have to create that popup here
  }

  /** actual api hit or service call  */
  private _serviceCall(payload: PostData): void {
    console.log('post api hit');
    console.log(payload);
  }
}

export interface LiveQuestion {
  question: Iquestions;
  index: number;
}

export interface PostData {
  round_id: number;
  question_id: number;
  answer: string;
}
