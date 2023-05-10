import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-collection-navbar',
  templateUrl: './collection-navbar.component.html',
  styleUrls: ['./collection-navbar.component.css']
})
export class CollectionNavbarComponent implements OnInit {
  collection: Collection = { user_id: -1, id: -1, name: ""};
  isReportsActive = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    protected collectionService: CollectionService,
    private dashboard: DashboardService
  ) {}

  ngOnInit() {
    this.collection = this.route.snapshot.data.collection;
    this.router.events.subscribe(val => {
      this.isReportsActive = this.router.url.includes("/report");
    });
  }

  deleteCollection() {
    this.dashboard.deleteCollection(this.collection.id).subscribe((res) => {
        this.router.navigate(['/dashboard/new-collection']);
    });
  }
}
