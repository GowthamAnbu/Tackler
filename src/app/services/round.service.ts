import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Iround } from '../interfaces/iround';

@Injectable()
export class RoundService {

  constructor() { }

  getRounds(id: number): Observable<Iround[]> {
    return Observable.of(rounds);
  }

}

const rounds = [
  {
      "id": 1,
      "level": "APPTITUDE/WRITTEN TEST",
      "scheduled_time": "2017-12-18T08:04:30.615Z",
      "state": false,
  },
  {
      "id": 2,
      "level": "TECHNICAL ROUND 1",
      "scheduled_time": "2017-12-20T10:38:14.223Z",
      "state": true,
  },
  {
      "id": 3,
      "level": "TECHNICAL ROUND 2",
      "scheduled_time": "2017-12-21T10:38:14.223Z",
      "state": false,
  },
  {
      "id": 4,
      "level": "MANAGER ROUND",
      "scheduled_time": "2017-12-22T10:38:14.223Z",
      "state": true,
  },
  {
      "id": 5,
      "level": "HR ROUND",
      "scheduled_time": "2017-12-23T10:38:14.223Z",
      "state": false,
  }
];
