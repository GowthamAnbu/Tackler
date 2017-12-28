import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { QuestionService } from '../services/question.service';
import { Iquestion } from '../interfaces/iquestion';

@Injectable()
export class QuestionListResolverService implements Resolve<Iquestion> {

  constructor(private _questionService: QuestionService, private _activatedRoute: ActivatedRoute) { }

  resolve(): Observable<Iquestion> {
    return this._questionService.getQuestions(+this._activatedRoute.snapshot.paramMap.get('id'));
  }

}
