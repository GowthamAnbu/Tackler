import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Iquestion } from '../interfaces/iquestion';

@Injectable()
export class QuestionService {

  constructor() { }

  getQuestions(id: number): Observable<Iquestion> {
    return Observable.of(questions);
  }

}

const questions = {
  "round_id": 12,
  "duration": 120,
  "start_time":"2018-01-04 11:46:15",
  "end_time": "2018-01-04 12:46:15",
  "current_time": "2018-01-04 12:45:15",
  "questions": [
  {
      "question_id": 1,
      "content": "is that true ?",
      "type": "yes_no",
      "options": [""],
      "answer": "false"
  },
  {
      "question_id": 2,
      "content": "Find the one ?",
      "type": "objective",
      "options": ["Option A","Option B","Option C","Option D"],
      "answer": "Option B"
  },
  {
      "question_id": 3,
      "content": "what is that ?",
      "type": "descriptive",
      "options": [""],
      "answer": "this is the answer guys !"
  },
  {
      "question_id": 4,
      "content": "is that false ?",
      "type": "yes_no",
      "options": [""],
      "answer": ""
  },
  {
      "question_id": 5,
      "content": "find the two?",
      "type": "objective",
      "options": ["Option A","Option B","Option C","Option D"],
      "answer": ""
  },
  {
      "question_id": 6,
      "content": "what are these ?",
      "type": "descriptive",
      "options": [""],
      "answer": ""
  },
  {
      "question_id": 7,
      "content": "is that that?",
      "type": "yes_no",
      "options": [""],
      "answer": ""
  },
  {
      "question_id": 8,
      "content": "what are those ?",
      "type": "objective",
      "options": ["Option A","Option B","Option C","Option D"],
      "answer": ""
  },
  {
      "question_id": 9,
      "content": "this is the descriptive ?",
      "type": "descriptive",
      "options": [""],
      "answer": ""
  },
  {
      "question_id": 10,
      "content": "is that this?",
      "type": "yes_no",
      "options": [""],
      "answer": ""
  },
  {
      "question_id": 11,
      "content": "where is that one?",
      "type": "objective",
      "options": ["Option A","Option B","Option C","Option D"],
      "answer": ""
  },
  {
      "question_id": 12,
      "content": "how ?",
      "type": "descriptive",
      "options": [""],
      "answer": ""
  },
  {
      "question_id": 13,
      "content": "what is that ?",
      "type": "yes_no",
      "options": [""],
      "answer": ""
  },
  {
      "question_id": 14,
      "content": "choose the best one?",
      "type": "objective",
      "options": ["Option A","Option B","Option C","Option D"],
      "answer": ""
  },
  {
      "question_id": 15,
      "content": "what is going on ?",
      "type": "descriptive",
      "options": [""],
      "answer": ""
  }]
};
