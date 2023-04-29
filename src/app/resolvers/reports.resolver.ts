import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportsResolver {
  constructor(private dashboardService: DashboardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Report[]> {
    const collectionId = route.parent?.params.collectionId;
    const collection = { id: collectionId, name: '', user_id: -1 };
    return this.dashboardService.getCollectionReports(collection);
  } 
}