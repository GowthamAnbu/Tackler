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

  private _getQuestions() {
    this.questions = this._activatedRoute.snapshot.data['roundQuestions']; console.log(this.questions);
  }

  isTestTaken(): boolean {
    return this._testTaken;
  }

  takeTest(): void {
    this._initialHit();
    this._testTaken = !this._testTaken;
    this._setLiveQuestion(0);
  }

  private _initialHit(): void {
    console.log('intial timer Hit');
  }

  private _setLiveQuestion(indexValue: number) {
    this.liveQuestion = {
      index: indexValue,
      question: this.questions.questions[indexValue]
    }; console.log(this.liveQuestion);
    /* this.liveQuestion.index = indexValue;
    this.liveQuestion.question = this.questions.questions[indexValue]; */
  }

  toggle(index: number): void {
    index += 1;
    if (index === this.questions.questions.length) {
      this.finalToggle = true;
      this.liveQuestion = undefined;
      return;
    }
    this._setLiveQuestion(index);
  }

  finalPreHit(): void {
    this._postData();
  }

  private _postData(): void {
    console.log('post api hit');
  }
}

export interface LiveQuestion {
  question: Iquestions;
  index: number;
}
