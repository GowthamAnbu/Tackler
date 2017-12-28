import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Ijob } from '../interfaces/ijob';

@Injectable()
export class JobService {

  constructor() { }

  getJobs(): Observable<Ijob[]> {
    return Observable.of(jobs);
  }
}

const jobs = [
  {
      "id": 1,
      "title": "RUBY ON RAILS",
      "description": "this is the best job in the world",
      "experience": 5,
      "no_of_vacancies": 3,
      "skills": [ "HTML", "CSS", "JAVASCRIPT", "RUBY"]
  },
  {
      "id": 2,
      "title": "MEAN STACK",
      "description": "this is the second best job in the world",
      "experience": 4,
      "no_of_vacancies": 3,
      "skills": [ "HTML", "CSS", "JAVASCRIPT", "PHP", "MONGODB", "ANGULAR", "EXPRESS JS", "NODE JS"]
  },
  {
      "id": 3,
      "title": "PHP",
      "description": "this is the third best job in the world",
      "experience": 3,
      "no_of_vacancies": 4,
      "skills": [ "HTML", "CSS", "JAVASCRIPT", "PHP"]
  },
  {
      "id": 4,
      "title": "ANGULAR",
      "description": "this is the fourth best job in the world",
      "experience": 3,
      "no_of_vacancies": 5,
      "skills": [ "HTML", "CSS", "JAVASCRIPT", "PHP"]
  },
  {
      "id": 5,
      "title": "REACT JS",
      "description": "this is the fifth best job in the world",
      "experience": 2,
      "no_of_vacancies": 2,
      "skills": [ "HTML", "CSS", "JAVASCRIPT", "SERVER SIDE CODING"]
  },
  {
      "id": 6,
      "title": "DEEP LEARNING",
      "description": "this is the sixth best job in the world",
      "experience": 1,
      "no_of_vacancies": 3,
      "skills": [ "MACHINE LEARNING", "LINEAR ALGEBRA", "ROBOTICS", "AERO DYNAMICS"]
  }
  ];
