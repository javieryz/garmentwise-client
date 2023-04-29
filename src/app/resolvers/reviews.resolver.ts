import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsResolver {
  constructor(private dashboardService: DashboardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Review[]> {
    const reportId = route.params.reportId;
    return this.dashboardService.getReportReviews(reportId);
  } 
}