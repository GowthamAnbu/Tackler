import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { JobService } from './job.service';
import { Ijob } from '../interfaces/Ijob';

@Injectable()
export class JobListResolverService implements Resolve<Ijob[]> {

  constructor(private _jobService: JobService) { }

  resolve() {
    return this._jobService.getJobs();
  }
}
