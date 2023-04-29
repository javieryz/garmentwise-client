import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {  
  collections: Collection[] = [];
  currentCollection: Collection | null = null;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private collectionService: CollectionService,
  ) {}

  ngOnInit() {
    console.log(sessionStorage.getItem('currentUserToken'))
    this.collectionService.collection$.subscribe(collection => this.currentCollection = collection);
    this.dashboardService.getUserCollections().subscribe((collections: Collection[]) => {
      this.collections = collections;
    }); 
  }

  handleCollectionClick(collection: Collection) {
    this.collectionService.setCollection(collection);
  }

  updateReports() {
    this.dashboardService.getUserCollections().subscribe((collections: Collection[]) => {
      this.collections = collections;
    });
  }

  logout() {
    this.authService.logout();
  }
}
