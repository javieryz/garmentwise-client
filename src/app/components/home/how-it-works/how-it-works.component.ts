import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  @ViewChild('title', {static: true}) title: ElementRef | undefined;
  
  elementWidth: string = "95%";
  isTransitioning: boolean = false;

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    
  }

  @HostListener('window:scroll', ['$event'])  
  onScroll(event: Event) {
    const titlePosition = this.title?.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= 200) {
      this.elementWidth = "100%";
    } else {
      this.elementWidth = "95%";
    }
  }

  onTransitionEnd() {
    this.isTransitioning = false;
  }
}
