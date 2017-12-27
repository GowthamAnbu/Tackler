import { Component, OnInit } from '@angular/core';

import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _jobService: JobService) { }

  ngOnInit() {
    this._getJobs();
  }

  private _getJobs(): void {
    this._jobService.getJobs()
    .subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
