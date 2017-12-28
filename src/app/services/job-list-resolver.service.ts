import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { JobService } from './job.service';
import { Ijob } from '../interfaces/ijob';

@Injectable()
export class JobListResolverService implements Resolve<Ijob[]> {

  constructor(private _jobService: JobService) { }

  resolve(): Observable<Ijob[]> {
    return this._jobService.getJobs();
  }
}
