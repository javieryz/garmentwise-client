import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  elements: NodeListOf<HTMLElement> | null = null;

  constructor() {}

  ngOnInit() {
    this.elements = document.querySelectorAll('.home');
    gsap.fromTo(this.elements, {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
    })
  }
}
