export interface InterviewRound {
  id: number;
  duration: number;
  status: string;
  start_time: string;
  end_time: string;
  current_time: string;
  interview_level: { name: string};
  interview_questions: Array<InterviewQuestion>;
}

export interface InterviewQuestion {
  id: number;
  answer: string;
  question: {
  content: string;
  question_type: string;
  options: Array<string>;
  };
}
