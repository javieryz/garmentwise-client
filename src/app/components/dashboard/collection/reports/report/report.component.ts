import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  report: Partial<Report> = {};
  reviews: Review[] | null = null;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.report = this.route.snapshot.data.report;
    this.reviews = this.route.snapshot.data.reviews;
  }
}