import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { JobService } from '../../services/job.service';
import { Ijob } from '../../interfaces/Ijob';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

displayedColumns: Array<string> = ['id', 'title', 'description', 'experience', 'no_of_vacancies' , 'skills'];
dataSource = new DashBoardDataSource(this._jobService);

  constructor(private _jobService: JobService) { }

  ngOnInit() {}
}

export class DashBoardDataSource extends DataSource<any> {
  constructor(private _jobService: JobService) {
    super();
  }
  connect(): Observable<Ijob[]> {
    return this._jobService.getJobs();
  }
  disconnect() {}
}
