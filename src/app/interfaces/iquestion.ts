export interface Iquestion {
  round_id: number;
  duration: number;
  questions: Array<Iquestions>;
}

export interface Iquestions {
  question_id: number;
  content: string;
  type: string;
  options: Array<string>;
}
