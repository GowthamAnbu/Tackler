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
private _questionIndex = 1;
questions: Iquestion;
liveQuestion: Iquestions;
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
    this.liveQuestion = this.questions.questions[0];
  }

  private _initialHit(): void {
    console.log('intial timer Hit');
  }

  toggle(): void {
    if (this._questionIndex === this.questions.questions.length) {
      this.finalToggle = true;
    }
    this.liveQuestion = this.questions.questions[this._questionIndex];
    ++this._questionIndex;
  }

  finalPreHit(): void {
    this._postData();
  }

  private _postData(): void {
    console.log('post api hit');
  }
}
