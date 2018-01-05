export interface Iquestion {
  round_id: number;
  duration: number;
  start_time: string;
  end_time: string;
  current_time: string;
  questions: Array<Iquestions>;
}

export interface Iquestions {
  question_id: number;
  content: string;
  type: string;
  options: Array<string>;
  answer: string;
}
