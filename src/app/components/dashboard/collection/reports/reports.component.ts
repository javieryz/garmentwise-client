import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private dashboard: DashboardService
  ) {}

  ngOnInit() {
    const reports = this.route.snapshot.data.reports;
    reports.sort((a: Report, b: Report) => {
      return b.id - a.id;
    });
    
    for (let report of reports) {
      const newDate = this.datePipe.transform(report.date, 'MMMM d, yyyy');
      report.date = newDate;
      if (report.overall_score < 1) report.overall_score = Math.round(report.overall_score * 100) / 10;
    }

    this.reports = this.route.snapshot.data.reports;
  }

  deleteReport(report: Report) {
    this.dashboard.deleteReport(report.id).subscribe((res) => {
      this.reports = this.reports.filter(r => r.id !== report.id);
    });
  }
}
