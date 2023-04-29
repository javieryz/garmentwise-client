import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportResolver {
  constructor(private dashboardService: DashboardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Report> {
    const reportId = route.params.reportId;
    return this.dashboardService.getReport(reportId);
  }
}