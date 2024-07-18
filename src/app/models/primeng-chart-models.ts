export interface LineChartModel{
  labels: string[];
  datasets: LineChartDatasetModel[];
  backgroundColor?: string
}

export interface LineChartDatasetModel{
  label: string;
  data: number[];
  fill: boolean,
  tension: number
  borderColor?: string
}

export interface BarChartDatasetModel {
  label: string;
  data: number[];
  backgroundColor: string;
}

export interface BarChartModel{
  labels: string[];
  datasets: BarChartDatasetModel[];
  // label: "Zestawy",
  //         backgroundColor: '#FFA726',
  //         data: kitsSum,
}