import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GarmentWise';
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;

  constructor(private router: Router) {}

  onUserLoggedIn(username: string) {
    this.router.navigate(['/dashboard'])
  }
}