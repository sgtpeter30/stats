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
  pointStyle?: PointStyle | string;
  pointRadius?: number;
}

export interface BarChartDatasetModel {
  base?: number;
  label: string;
  data: object|object[]| number[]|string[]
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  barPercentage?: number;
  barThickness?: number | string;
  borderSkipped?: string | boolean;
  borderRadius?: number|object;
  categoryPercentage?: number;
  clip?: number|object|false;
  grouped?: boolean;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
	hoverBorderWidth?: number;
  hoverBorderRadius?: number;
  indexAxis?: string;
  inflateAmount?: number|'auto';
  maxBarThickness?: number;
  minBarLength?: number;
  order?: 	number;
  pointStyle?: PointStyle;
  pointRadius?: number;
  skipNull?: boolean;
  stack?:	string;
  xAxisID?: string;
  yAxisID?: string;
}

export enum PointStyle{
  circle = 'circle',
  cross = 'cross',
  crossRot = 'crossRot',
  dash = 'dash',
  line = 'line',
  rect = 'rect',
  rectRounded = 'rectRounded',
  rectRot = 'rectRot',
  star = 'star',
  triangle = 'triangle',
  false = 'false'
}

export interface BarChartModel{
  labels: string[];
  datasets: BarChartDatasetModel[];
}