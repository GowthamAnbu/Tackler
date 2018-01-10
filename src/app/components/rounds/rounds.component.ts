import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Iround } from '../../interfaces/iround';
import { RoundService } from '../../services/round.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})

export class RoundsComponent implements OnInit {

  displayedColumns: Array<string> = ['level', /*  'scheduled_time', */ 'status'];
  dataSource: RoundDataSource | null;
  private _rounds: Iround[] = [];
  interviewId: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private _activatedRoute: ActivatedRoute, private _roundService: RoundService) { }

  ngOnInit() {
    this.interviewId = this._activatedRoute.snapshot.paramMap.get('id');
    this._getJobs();
    this.setProperties();
  }

  private setProperties() {
    this.dataSource = new RoundDataSource(this._rounds, this.sort);
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
    this._rounds = this._activatedRoute.snapshot.data['interviewRounds'].interview_rounds;
    // this._roundService.getRounds(this._activatedRoute.snapshot.paramMap.get('id'))
    // .subscribe(
    //   data => {
    //     console.log(data);
    //     this._rounds = data['interview-rounds'];
    //   },
    //   err => console.log(err)
    // );
  }

}

export class RoundDataSource extends DataSource<any> {

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: Iround[] = [];

  constructor(private _roundsDatabase: Iround[], private _sort: MatSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Iround[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      Observable.of(this._roundsDatabase),
      this._sort.sortChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._roundsDatabase.filter((round: Iround) => {
        const searchStr = (round.interview_level.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      return sortedData;
    });
  }

  disconnect() {}

    /** Returns a sorted copy of the database data. */
    sortData(data: Iround[]): Iround[] {
      if (!this._sort.active || this._sort.direction === '') { return data; }

      return data.sort((a, b) => {
        let propertyA: number | string | boolean = '';
        let propertyB: number | string | boolean = '';

        switch (this._sort.active) {
          case 'level': [propertyA, propertyB] = [a.interview_level.name, b.interview_level.name]; break;
          // case 'scheduled_time': [propertyA, propertyB] = [a.scheduled_time, b.scheduled_time]; break;
          case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
        }

        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });
    }
}
