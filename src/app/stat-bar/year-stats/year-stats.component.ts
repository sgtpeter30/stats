import { Component, Input } from '@angular/core';
import { ChartDataset, ChartData } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { StatsModel } from 'src/app/models/stats-model';
import { kitsList, pizzaList } from 'src/assets/pizzaList';

@Component({
  selector: 'app-year-stats',
  standalone: true,
  imports: [
    ChartModule,
    ToggleButtonModule
  ],
  templateUrl: './year-stats.component.html',
  styleUrl: './year-stats.component.scss'
})
export class YearStatsComponent {
  @Input()
  data!: { year: string, value: [StatsModel] };

  hideStacked: boolean = true;
  pizzaBarData!: any;
  pizzaBarDataStacked!: any;
  kitsBarData!: any;
  kitsBarDataStacked!: any;

  stackedData: any;
  stackedOptions: any = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: (context: any, index: number) => {
            const year = this.data.year
            const fullDate = `${context.tick.label}.${year}`;
            // return this.isWeekend(fullDate) ? "#920000" : "#fff";
            return this.isWeekend(fullDate) ? "#ec4c07" : "#fff";
          },
        },
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  }

  ngOnInit(): void {
    const currentYearValue = this.data.value
    const days = Array.from(currentYearValue, (x) => x.date)

    const pizzaSum = Array.from(currentYearValue, (x) => x.pizzaSum)
    const pizzaBarData: ChartData<'bar'> = {
      labels: days,
      datasets: [
        {
          label: `Pizza`,
          backgroundColor: '#42A5F5',
          data: pizzaSum,
        }
      ]
    }
    const pizzaBarDataStacked: ChartData<'bar'> = {
      labels: days,
      datasets: this.getPizzaDataset(),
    }

    const kitsSum = Array.from(currentYearValue, (x) => x.kitSum)
    const kitsBarData: ChartData<'bar'> = {
      labels: days,
      datasets: [
        {
          label: "Zestawy",
          backgroundColor: '#FFA726',
          data: kitsSum,
        }
      ]
    }
    const kitsBarDataStacked: ChartData<'bar'> = {
      labels: days,
      datasets: this.getKitsDataset(),
    }

    this.pizzaBarData = pizzaBarData;
    this.pizzaBarDataStacked = pizzaBarDataStacked;
    this.kitsBarData = kitsBarData;
    this.kitsBarDataStacked = kitsBarDataStacked;
  }

  buttonChange() {
    this.hideStacked = !this.hideStacked
  }

  private getPizzaDataset() {
    const currentYearValue = this.data.value
    const datasets: ChartDataset<"bar", number[]>[] = [];
    for (const pizza of pizzaList) {
      const pizzaArrayFull = Array.from(currentYearValue, (x) => x.pizzaArray.find(item => item.pizzaName === pizza.name)?.pizzaQuantity) as number[];
      const datasetItem: ChartDataset<"bar", number[]> = {
        type: 'bar',
        label: pizza.name,
        data: pizzaArrayFull,
        backgroundColor: pizza.color,
      }
      datasets.push(datasetItem)
    }
    return datasets
  }

  private getKitsDataset() {
    const kitsDatasets: ChartDataset<"bar", number[]>[] = [];
    const currentYearValue = this.data.value
    for (const kits of kitsList) {
      const kitsArrayFull = Array.from(currentYearValue, (x) => x.kitsArray.find(item => item.kitName === kits.name)?.kitQuantity) as number[];
      const datasetItem: ChartDataset<"bar", number[]> = {
        type: 'bar',
        label: kits.name,
        data: kitsArrayFull,
        backgroundColor: kits.color,
      }
      kitsDatasets.push(datasetItem)
    }
    return kitsDatasets
  }

  private isWeekend(dateString) {
    // Split the date string into day, month, and year parts
    const [day, month, year] = dateString.split('.').map(Number);

    // Create a Date object using the split parts
    const date = new Date(year, month - 1, day); // Note: months are zero-based in JavaScript

    // Extract the day of the week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = date.getDay();

    // Check if the day is Saturday or Sunday
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

}
