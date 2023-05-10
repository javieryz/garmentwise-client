import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { Collection } from '../models/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionResolver {
  constructor(private dashboardService: DashboardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collection> {
    const collectionId = route.params.collectionId;
    return this.dashboardService.getCollection(collectionId);
  }
}