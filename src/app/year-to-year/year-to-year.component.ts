import { Component, Input, OnInit } from '@angular/core';
import { StatsModel } from '../models/stats-model';
import { BarChartModel, LineChartDatasetModel, LineChartModel } from '../models/primeng-chart-models';
import { pizzaList } from 'src/assets/pizzaList';

@Component({
  selector: 'app-year-to-year',
  templateUrl: './year-to-year.component.html',
  styleUrls: ['./year-to-year.component.scss']
})
export class YearToYearComponent implements OnInit {
  @Input() statistics!: [{ year: string, value: [StatsModel] }];

  uniqueDates: string[] = [];
  
  pizzaData!: LineChartModel;
  othersData!: LineChartModel;
  pizzaByYears!: LineChartModel;
  pizzaByType!: BarChartModel;
  

  constructor() { }

  ngOnInit(): void {
    this.uniqueDates = this.getUniqueDates()
    console.log(this.statistics)
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
    const datasets: any[] = [];
    for (const stats of this.statistics) {
      const data: number[] = [];
      for (const dates of this.uniqueDates) {
        const sameDateItem = stats.value.find(item => dates.includes(item.date))
        const value = sameDateItem ? sameDateItem?.pizzaSum : 0
        data.push(value)
      }
      const singleDataset = {
        label: stats.year,
        data: data,
        fill: false,
        tension: .4
      }
      datasets.push(singleDataset)
    }
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
        fill: false,
        tension: .4
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
    const datasets: LineChartDatasetModel[] = [];
    for (const statistic of this.statistics) {
      const daysArray = statistic.value
      console.log(statistic.year)
      const allYearPizzasArray = daysArray.flatMap(day => day.pizzaArray)
      const data: number[] = [];
      for (const pizza of pizzaList) {
        const pizzaTypeQuantity = allYearPizzasArray.filter(item => item.pizzaName === pizza.name).reduce((number, item)=> number + item.pizzaQuantity, 0)
        console.log(pizzaTypeQuantity);
        data.push(pizzaTypeQuantity)
      }
      const singleDataset: LineChartDatasetModel = {
        label: statistic.year,
        data: data,
        fill: false,
        tension: .4,
      }      
      datasets.push(singleDataset)
    }
    datasets[0].borderColor = '#42A5F5';
    datasets[1].borderColor = '#FFA726';
    datasets[2].borderColor = '#ff3a26';
    const pizzasNames = pizzaList.map(pizza=> pizza.name)
    this.pizzaByYears = {
      labels: pizzasNames,
      datasets: datasets
    }

  }
  private createPizzaByTypeDataset(){}

}
