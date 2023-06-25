import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsResolverService implements Resolve<any> {

  constructor(
    private http: HttpClient,
  ) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
    return this.http.get('http://localhost:3500/stats')
  }
}
