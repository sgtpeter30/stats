import { Component, Input, OnInit } from '@angular/core';
import { StatsModel } from '../models/stats-model';

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.scss']
})
export class StatBarComponent implements OnInit {
  @Input() statistics: [StatsModel];

  barData: any = {};

  constructor() {

   }

  ngOnInit(): void {
    const days = Array.from(this.statistics, (x)=>x.date)
    // const pizzavalues = Array.from(this.statistics, (x)=>x.pizzaArray)
    const pizzaSum = Array.from(this.statistics, (x)=>x.pizzaSum)
    const kitsSum = Array.from(this.statistics, (x)=>x.kitSum)
    console.log("days");

    console.log(days);

    console.log("days gone");


    this.barData.labels = days
    this.barData.datasets = [
      {
        label: "Pizza",
        backgroundColor: '#42A5F5',
        data: pizzaSum,
      },
      {
        label: "Zestawy",
        backgroundColor: '#FFA726',
        data: kitsSum,
      }
    ]



  }

}
