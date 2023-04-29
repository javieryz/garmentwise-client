import { Component, ElementRef, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title: NodeListOf<HTMLElement> | null = null;

  constructor(public nav: NavbarService, private elRef: ElementRef) {}

  ngOnInit() {
    this.nav.show();
    this.title = document.querySelectorAll('.home-title');
    gsap.fromTo(this.title, {
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
