import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collection: Collection | null = null;

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.collectionService.collection$.subscribe(collection => this.collection = collection);
  }
}
