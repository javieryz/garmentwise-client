import { Component, OnDestroy, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, OnDestroy {
  collection: Collection | null = null;
  elements: NodeListOf<HTMLElement> | null = null;

  constructor(private collectionService: CollectionService) {}

  ngOnInit() {
    this.elements = document.querySelectorAll('.dashboard');
    console.log(this.elements)
    gsap.fromTo(this.elements, {
      y: 0,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power4.out',
    })
  }

  ngOnDestroy() {
    this.elements = document.querySelectorAll('.dashboard');
    console.log(this.elements)
    gsap.fromTo(this.elements, {
      y: 0,
      opacity: 1
    }, {
      y: 0,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    })
  }
}
