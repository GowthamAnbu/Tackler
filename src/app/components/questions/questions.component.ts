import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Iquestion } from '../../interfaces/iquestion';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

questions: Iquestion;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._getQuestions();
  }


  private _getQuestions() {
    this.questions = this._activatedRoute.snapshot.data['roundQuestions'];
  }
}
