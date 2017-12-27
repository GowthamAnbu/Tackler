import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';

import { JobService } from '../../services/job.service';
import { Ijob } from '../../interfaces/Ijob';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

displayedColumns: Array<string> = [/* 'id', */ 'title', 'description', 'experience', 'no_of_vacancies' , 'skills'];
dataSource: DashBoardDataSource | null;
private _jobs: Ijob[] = [];

@ViewChild(MatSort) sort: MatSort;

constructor(private _jobService: JobService) { }

  ngOnInit() {
    this._getJobs();
    this.dataSource = new DashBoardDataSource(this._jobs, this.sort);
  }

  private _getJobs() {
      this._jobService.getJobs()
      .subscribe(
        data => {
          this._jobs = data;
        },
        err => {
          console.log(err);
        }
      );
  }

}

export class DashBoardDataSource extends DataSource<any> {

  filteredData: Ijob[] = [];
  // renderedData: Ijob[] = [];

  constructor(private _jobsDatabase: Ijob[], private _sort: MatSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Ijob[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      Observable.of(this._jobsDatabase),
      this._sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      this.filteredData = this._jobsDatabase;
      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());
      return sortedData;
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Ijob[]): Ijob[] {
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'experience': [propertyA, propertyB] = [a.experience, b.experience]; break;
        case 'no_of_vacancies': [propertyA, propertyB] = [a.no_of_vacancies, b.no_of_vacancies]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
