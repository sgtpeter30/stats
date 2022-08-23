import { Component, OnInit, Input } from '@angular/core';
import { StatsModel } from '../models/stats-model';
import { pizzaList } from "../../assets/pizzaList";

@Component({
  selector: 'app-day-chart',
  templateUrl: './day-chart.component.html',
  styleUrls: ['./day-chart.component.scss']
})
export class DayChartComponent implements OnInit {
  @Input() data: StatsModel;
  chartData:{} = {};
  kitsData: {} = {};
  config: {} = {};
  constructor() { }

  ngOnInit(): void {

    // pizza Data
    const pizzaColor = Array.from(pizzaList, x=>x.color);
    const pizzaColorDarker = Array.from(pizzaList, x=>x.darkerColor);
    const pizzaNames = Array.from(this.data.pizzaArray, (x)=>x.pizzaName)
    const pizzaValues = Array.from(this.data.pizzaArray, (x)=>x.pizzaQuantity)
    this.chartData = {
      labels: pizzaNames,
      datasets: [
        {
          data: pizzaValues,
          backgroundColor: pizzaColor,
          hoverBackgroundColor: pizzaColorDarker
        }
      ],
      config: {
        plugins: {
          legend: {
            labels: {

            }
          }
        }
      }
    }
    // kits Data
    const kitsNames = Array.from(this.data.kitsArray, (x)=>x.kitName)
    const kitsValues = Array.from(this.data.kitsArray, (x)=>x.kitQuantity)
    this.kitsData = {
      labels: kitsNames,
      datasets: [
        {
          data: kitsValues,
          backgroundColor: [
            '#EC407A',
            '#AB47BC',
            '#42A5F5',
            '#7E57C2',
            '#66BB6A',
            '#FFCA28',
            '#26A69A'
        ],
        }
      ]
    }
    // additional options
    this.config = {
      plugins: {
        legend: {
            labels: {
              color: '#ffffff'
            }
        }
      }
    }
  }
}
