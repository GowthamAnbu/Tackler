import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Ijob } from '../../interfaces/ijob';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

displayedColumns: Array<string> = ['title', 'description', 'experience', 'no_of_vacancies' , 'skills'];
dataSource: DashBoardDataSource | null;
private _jobs: Ijob[] = [];

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
@ViewChild('filter') filter: ElementRef;

constructor(private _activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this._getJobs();
    this.setProperties();
  }

  private setProperties() {
    this.dataSource = new DashBoardDataSource(this._jobs, this.paginator, this.sort);
    // Observable for the filter
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  private _getJobs() {
    this._jobs = this._activateRoute.snapshot.data['jobs'].interviews;
  }

}

export class DashBoardDataSource extends DataSource<any> {

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: Ijob[] = [];
  renderedData: Ijob[] = [];

  constructor(private _jobsDatabase: Ijob[], private _paginator: MatPaginator, private _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Ijob[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      Observable.of(this._jobsDatabase),
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._jobsDatabase.filter((job: Ijob) => {
        const searchStr = (job.job.title).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
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
        case 'title': [propertyA, propertyB] = [a.job.title, b.job.title]; break;
        case 'experience': [propertyA, propertyB] = [a.job.experience, b.job.experience]; break;
        case 'no_of_vacancies': [propertyA, propertyB] = [a.job.no_of_vacancies, b.job.no_of_vacancies]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
