import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { JobService } from './job.service';
import { Ijob } from '../interfaces/ijob';

@Injectable()
export class JobListResolverService implements Resolve<any> {

  constructor(private _jobService: JobService) { }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
    return this._jobService.getJobs(activatedRouteSnapshot.paramMap.get('auth_token'))
    .catch(this._handleError);
  }

  private _handleError(err) {
    return Observable.throw(err);
  }
}
