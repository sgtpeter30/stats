import { Component, Input, OnInit } from '@angular/core';
import { StatsModel } from '../models/stats-model';
import { BarChartDatasetModel, BarChartModel, LineChartDatasetModel, LineChartModel, PointStyle } from '../models/primeng-chart-models';
import { Chart, ChartData, ChartDataset } from 'chart.js';
import { pizzaList } from 'src/assets/pizzaList';

@Component({
  selector: 'app-year-to-year',
  templateUrl: './year-to-year.component.html',
  styleUrls: ['./year-to-year.component.scss']
})
export class YearToYearComponent implements OnInit {
  @Input() statistics!: [{ year: string, value: [StatsModel] }];

  uniqueDates: string[] = [];
  
  pizzaData!: ChartData<'line'>;
  othersData!: ChartData<'line'>;
  pizzaByYears!: ChartData<'bar'>;
  pizzaByType!: ChartData<'bar'>;
  

  constructor() { }

  ngOnInit(): void {
    this.uniqueDates = this.getUniqueDates()
    this.createPizzaDataset();
    this.createOthersDataset();
    this.createPizzaByYearsDataset();
  }

  private getUniqueDates(){
    const allLabels = this.statistics.flatMap(year => year.value.map(iten => iten.date))
    const uniqueDates = [...new Set(allLabels)];
    const uniqueDatesSorted = uniqueDates.sort((a, b)=> {
      const dateA = this.parseDate(a);
      const dateB = this.parseDate(b);
      return dateA.getTime() - dateB.getTime();
    })
    return uniqueDatesSorted
  }

  private parseDate(dateString) {
    const [day, month] = dateString.split('.');
    return new Date(2000, parseInt(month), parseInt(day));
  }

  private createPizzaDataset(){
    const datasets: LineChartDatasetModel[] = [];
    for (const stats of this.statistics) {
      const data: number[] = [];
      for (const dates of this.uniqueDates) {
        const sameDateItem = stats.value.find(item => dates.includes(item.date))
        const value = sameDateItem ? sameDateItem?.pizzaSum : 0
        data.push(value)
      }
      const singleDataset:LineChartDatasetModel = {
        label: stats.year,
        data: data,
        fill: false,
        tension: .4,
        pointRadius: 10,
      }
      datasets.push(singleDataset)
    }
    datasets[0].pointStyle = 'triangle';

    datasets[0].borderColor = '#42A5F5';
    datasets[1].borderColor = '#FFA726';
    datasets[2].borderColor = '#ff3a26';
    this.pizzaData = {
      labels: this.uniqueDates,
      datasets: datasets,
    };
  }
  private createOthersDataset(){
    const datasets: LineChartDatasetModel[] = [];

    for (const stats of this.statistics) {
      const data: number[] = [];
      for (const dates of this.uniqueDates) {
        const sameDateItem = stats.value.find(item => dates.includes(item.date))
        const value = sameDateItem ? sameDateItem?.kitSum : 0
        data.push(value)
      }
      const singleDataset: LineChartDatasetModel = {
        label: stats.year,
        data: data,
        pointStyle: PointStyle.triangle,
        fill: false,
        tension: .4,
        pointRadius: 10,
      }
      datasets.push(singleDataset)
    }

    

    datasets[0].borderColor = '#42A5F5';
    datasets[1].borderColor = '#FFA726';
    datasets[2].borderColor = '#ff3a26';
    
    this.othersData = {
      labels: this.uniqueDates,
      datasets: datasets
    };
  }

  private createPizzaByYearsDataset(){
    const datasets: ChartDataset<"bar", number[]>[] = [];
    for (const statistic of this.statistics) {
      const daysArray = statistic.value
      const allYearPizzasArray = daysArray.flatMap(day => day.pizzaArray)
      const data: number[] = [];
      for (const pizza of pizzaList) {
        const pizzaTypeQuantity = allYearPizzasArray.filter(item => item.pizzaName === pizza.name).reduce((number, item)=> number + item.pizzaQuantity, 0)
        data.push(pizzaTypeQuantity)
      }
      const singleDataset: ChartDataset<"bar", number[]> = {
        label: statistic.year,
        data: data,
      }      
      datasets.push(singleDataset)
    }
    datasets[0].backgroundColor = '#42A5F5';
    datasets[1].backgroundColor = '#FFA726';
    datasets[2].backgroundColor = '#ff3a26';
    const pizzasNames = pizzaList.map(pizza=> pizza.name)
    this.pizzaByYears = {
      labels: pizzasNames,
      datasets: datasets,
    }

  }
  private createPizzaByTypeDataset(){

  }

}
