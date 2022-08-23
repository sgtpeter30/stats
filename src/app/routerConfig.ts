// routerConfig.ts

import { Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { StatisticsResolverService } from './dashboards/statistics-resolver';
import { StatFormComponent } from './stat-form/stat-form.component';

const appRoutes: Routes = [
  {
    path: '',
    component: StatFormComponent
  },
  {
    path: 'dashboards',
    component: DashboardsComponent,
    resolve: {
      statistics: StatisticsResolverService
    }
  },
  {
    path: 'day-:id',
    component: DashboardsComponent
  }
];
export default appRoutes;
