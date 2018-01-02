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
private _postData: PostData;
questions: Iquestion;
liveQuestion: LiveQuestion;
finalToggle = false;
liveAnswer: Answer;
answer: string;
preview = false;
  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._getQuestions();
    this._postData = {
      round_id: this.questions.round_id, // intialization of postData
      answers : []
    };
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
  }

  /* timer hit after taking the test for security reasons */
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

  goto(index: number): void {
    const id = this._getQuestionId(index);
    if (this._isAnswered(id)) {
      this.preview = true;
    }
    this._setLiveQuestion(index);
  }

  /** master Toggle controlling the liveQuestion to be viewed or not */
  toggle(index: number): void {
    this._setLiveAnswer(index);
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
  private _setLiveAnswer(index: number) {
    // set answer to empty string if answer is not selected
    if (this.answer === undefined) {
      this.answer = '';
    }
    this.liveAnswer = {
      question_id: this._getQuestionId(index),
      answer: this.answer.trim()
    };
    this._setPostData(this.liveAnswer);
    console.log(`postData is `, this._postData);
    console.log(`index of liveAnswer`, this._getIndexOfCurrentAnswer(this.liveAnswer));
  }

  /** gets the questionId based on the index given */
  private _getQuestionId(index: number): number {
    return this.questions.questions[index].question_id;
  }

  /* sets the final postData answers array based on the input */
  private _setPostData(payload: Answer): void {
    if (this._isAnswered(payload.question_id)) {
      console.log('ALREADY ANSWERED');
      const index = this._getIndexOfCurrentAnswer(payload);
      this._postData.answers[index] = payload;
    }else {
      this._postData.answers.push(payload);
    }
  }

  /** returns the index of the search Element otherwise -1 */
  private _getIndexOfCurrentAnswer(searchElement: Answer): number {
    return this._postData.answers.indexOf(searchElement);
  }

  /** returns true if question refferred by given id is already answered otherwise false */
  private _isAnswered(id: number): boolean {
    const filterData = this._postData.answers.filter(answer => answer.question_id === id);
    return filterData.length !== 0 ;
  }

  /** things to do before hitting the api or service call  */
  finalPreHit(): void {
    this._serviceCall();
  }

  /** actual api hit or service call  */
  private _serviceCall(): void {
    console.log('post api hit');
  }
}

export interface LiveQuestion {
  question: Iquestions;
  index: number;
}

export interface PostData {
  round_id: number;
  answers: Array<Answer>;
}

export interface Answer {
  question_id: number;
  answer: string;
}
