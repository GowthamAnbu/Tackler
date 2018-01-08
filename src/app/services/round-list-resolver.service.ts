import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RoundService } from './round.service';
import { Iround } from '../interfaces/iround';

@Injectable()
export class RoundListResolverService implements Resolve<Iround> {

  constructor(private _roundService: RoundService) { }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Iround> {
    return this._roundService.getRounds(activatedRouteSnapshot.paramMap.get('id'));
  }
}
