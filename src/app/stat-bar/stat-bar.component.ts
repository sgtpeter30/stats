import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StatsModel } from '../models/stats-model';


@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatBarComponent{
  @Input() statistics!: [{ year: string, value: [StatsModel] }];
}