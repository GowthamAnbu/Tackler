import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { QuestionService } from '../services/question.service';
import { InterviewRound } from '../interfaces/interview-round';

@Injectable()
export class QuestionListResolverService implements Resolve<InterviewRound> {

  constructor(private _questionService: QuestionService, private _activatedRoute: ActivatedRoute) { }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<InterviewRound> {
    return this._questionService.getQuestions(
      activatedRouteSnapshot.paramMap.get('round_id'),
      activatedRouteSnapshot.paramMap.get('interview_id'));
  }

}
