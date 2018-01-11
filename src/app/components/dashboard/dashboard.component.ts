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

constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._getJobs();
  }

  private _getJobs() {
    this.interview = this._activatedRoute.snapshot.data['interview'].interview;
  }

}
