export interface Ijob {
  id: number;
  state: string;
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
