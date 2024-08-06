import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './routerConfig';

import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { AppComponent } from './app.component';
import { StatFormComponent } from './stat-form/stat-form.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { DayChartComponent } from './day-chart/day-chart.component';
import { StatTableComponent } from './stat-table/stat-table.component';
import { StatBarComponent } from './stat-bar/stat-bar.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MessageService } from 'primeng/api';
import { AdminComponent } from './admin/admin.component';
import { YearToYearComponent } from './year-to-year/year-to-year.component';
import { YearStatsComponent } from "./stat-bar/year-stats/year-stats.component";

export const environment = {
  // apiUrl: "http://localhost:3000"
  apiUrl: ""
};

@NgModule({
  declarations: [
    AppComponent,
    StatFormComponent,
    DashboardsComponent,
    DayChartComponent,
    StatTableComponent,
    StatBarComponent,
    LoginComponent,
    AdminComponent,
    YearToYearComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputNumberModule,
    CalendarModule,
    AccordionModule,
    TableModule,
    ButtonModule,
    ChartModule,
    TabViewModule,
    ToastModule,
    InputTextModule,
    ToggleButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    YearStatsComponent
],
  providers: [
    MessageService,
    { provide: "BASE_API_URL", useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
