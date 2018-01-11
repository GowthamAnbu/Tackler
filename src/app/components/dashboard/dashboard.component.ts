import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Iinterview } from '../../interfaces/iinterview';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

interview: Iinterview;
experience: Array<number> = [];
experiencen = 0;

constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._getJobs();
  }

  private _getJobs() {
    this.interview = this._activatedRoute.snapshot.data['interview'].interview;
    this.experiencen = parseInt(this.interview.job.experience, 10);
    this.experience[0] = parseInt(this.interview.job.experience.split('.')[0], 10);
    this.experience[1] = parseInt(this.interview.job.experience.split('.')[1], 10);
  }

}
