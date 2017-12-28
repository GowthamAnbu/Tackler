import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RoundService } from './round.service';
import { Iround } from '../interfaces/iround';

@Injectable()
export class RoundListResolverService implements Resolve<Iround> {

  constructor(private _roundService: RoundService, private _activatedRoute: ActivatedRoute) { }

  resolve(): Observable<Iround> {
    return this._roundService.getRounds(+this._activatedRoute.snapshot.paramMap.get('id'));
  }
}
