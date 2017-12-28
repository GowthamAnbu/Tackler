export interface Iround {
  interview_id: number;
  rounds: Array<Irounds>;
}

export interface Irounds {
  id: number;
  level: string;
  scheduled_time: string;
  status: string;
}
