import { Component, Input, OnInit } from '@angular/core';
import { StatsModel } from '../models/stats-model';

@Component({
  selector: 'app-stat-table',
  templateUrl: './stat-table.component.html',
  styleUrls: ['./stat-table.component.scss']
})
export class StatTableComponent implements OnInit {

  @Input() statistics: StatsModel;

  constructor() { }

  ngOnInit(): void {
  }

}
