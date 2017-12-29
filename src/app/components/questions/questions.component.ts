import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Iquestion, Iquestions } from '../../interfaces/iquestion';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {

private _testTaken = false;
questions: Iquestion;
liveQuestion: LiveQuestion;
finalToggle = false;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._getQuestions();
  }

  /** returns the initial question object  */
  private _getQuestions() {
    this.questions = this._activatedRoute.snapshot.data['roundQuestions']; console.log(this.questions);
  }

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
  }

  private _initialHit(): void {
    console.log('intial timer Hit');
  }

  /** sets the liveQuestion based on the index given */
  private _setLiveQuestion(indexValue: number) {
    this.liveQuestion = {
      index: indexValue,
      question: this.questions.questions[indexValue]
    };
  }

  /** master Toggle controlling the liveQuestion to be viewed or not */
  toggle(index: number): void {
    index += 1;
    if (index === this.questions.questions.length) {
      this.finalToggle = true;
      this.liveQuestion = undefined;
      return;
    }
    this._setLiveQuestion(index);
  }

  /** things to do before hitting the api or service call  */
  finalPreHit(): void {
    this._postData();
  }

  /** actual api hit or service call  */
  private _postData(): void {
    console.log('post api hit');
  }
}

export interface LiveQuestion {
  question: Iquestions;
  index: number;
}
