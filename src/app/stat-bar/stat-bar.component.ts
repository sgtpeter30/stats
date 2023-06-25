import { Component, Input, OnInit } from '@angular/core';
import { StatsModel } from '../models/stats-model';

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.scss']
})
export class StatBarComponent implements OnInit {
  // @Input() statistics: [StatsModel];
  @Input() statistics: [{year: string, value: [StatsModel]}];
  barList: any = [];
  // barData: any = {};

  constructor() {

   }

  ngOnInit(): void {
    const year = Array.from(this.statistics, x=>x.value)
    year.forEach(currentYear=>{
      const days = Array.from(currentYear, (x)=>x.date)
      // const pizzavalues = Array.from(currentYear, (x)=>x.pizzaArray)
      const pizzaSum = Array.from(currentYear, (x)=>x.pizzaSum)
      const kitsSum = Array.from(currentYear, (x)=>x.kitSum)
      console.log("days");

      console.log(days);

      console.log("days gone");
      const barData: any = {}

      barData.labels = days
      barData.datasets = [
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
      this.barList.push(barData)

    })



  }

}
