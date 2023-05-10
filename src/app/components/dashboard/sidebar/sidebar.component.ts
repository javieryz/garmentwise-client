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
  currentCollectionId: number;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private collectionService: CollectionService,
  ) {
    if (localStorage.getItem('currentCollectionId')) 
      this.currentCollectionId = +localStorage.getItem('currentCollectionId')!
    else
      this.currentCollectionId = -1;
  }

  ngOnInit() {
    this.dashboardService.getUserCollections().subscribe((collections: Collection[]) => {
      collections.sort((a: Collection, b: Collection) => {
        return a.id - b.id;
      });
      this.collections = collections;
    }); 
    
    if (localStorage.getItem('currentCollectionId')) 
      this.currentCollectionId = +localStorage.getItem('currentCollectionId')!
    else
      this.currentCollectionId = -1;
  }

  handleCollectionClick(collection: Collection) {
    localStorage.setItem('currentCollectionName', collection.name);
    localStorage.setItem('currentCollectionId', collection.id.toString());
  }

  handleNewCollectionClick() {
    if (this.currentCollectionId) this.currentCollectionId = -1;
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
