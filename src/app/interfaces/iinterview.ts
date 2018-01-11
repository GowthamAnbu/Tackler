export interface Iinterview {
  id: number;
  job: Job;
}

export class Job {
  title: string;
  description: string;
  experience: string;
  no_of_vacancies: number;
  referral_code: string;
  skill_names: Array<string>;
}
