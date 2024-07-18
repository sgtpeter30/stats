// routerConfig.ts

import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { StatisticsResolverService } from './dashboards/statistics-resolver';
import { StatFormComponent } from './stat-form/stat-form.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { userLogged, PermissionsService } from './services/permission.service';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'statistics',
    component: StatFormComponent,
    canActivate: [userLogged],
  },
  {
    path: 'dashboards',
    component: DashboardsComponent,
    canActivate: [userLogged],
    resolve: {
      statistics: StatisticsResolverService
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [userLogged],
  },
  {
    path: 'day-:id',
    component: DashboardsComponent
  }
];
export default appRoutes;
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [PermissionsService]
})
export class AppRoutingModule { }
