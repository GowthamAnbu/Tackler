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
      "scheduled_time": "1514443872373.67 1514443872374",
      "state": false,
  },
  {
      "id": 2,
      "level": "TECHNICAL ROUND 1",
      "scheduled_time": "1514443913550.59 1514443913550",
      "state": false,
  },
  {
      "id": 3,
      "level": "TECHNICAL ROUND 2",
      "scheduled_time": "1514443937939.42 1514443937939",
      "state": false,
  },
  {
      "id": 4,
      "level": "MANAGER ROUND",
      "scheduled_time": "1514443947780.945 1514443947781",
      "state": false,
  },
  {
      "id": 5,
      "level": "HR ROUND",
      "scheduled_time": "1514443955119.575 1514443955119",
      "state": false,
  }
];
