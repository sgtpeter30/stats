import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputNumberModule } from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import { StatFormComponent } from './stat-form/stat-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ChartModule} from 'primeng/chart';
import {TabViewModule} from 'primeng/tabview';
import { TestFormComponent } from './test-form/test-form.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { RouterModule } from '@angular/router';
import appRoutes from './routerConfig';
import { DayChartComponent } from './day-chart/day-chart.component';
import { StatTableComponent } from './stat-table/stat-table.component';
import { StatBarComponent } from './stat-bar/stat-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    StatFormComponent,
    TestFormComponent,
    DashboardsComponent,
    DayChartComponent,
    StatTableComponent,
    StatBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputNumberModule,
    CalendarModule,
    TableModule,
    ButtonModule,
    ChartModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
