import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this._activatedRoute.snapshot.data['question']);
  }

}
