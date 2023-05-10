import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Report } from 'src/app/models/report';

@Component({
  selector: 'app-overview-sentiment-card',
  templateUrl: './overview-sentiment-card.component.html',
  styleUrls: ['./overview-sentiment-card.component.css']
})
export class OverviewSentimentCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() title: string = '';
  @Input() score: number = 0;
  @Input() numReviews: number = 0;
  @Input() scoreType: string = '';

  reports: Report[] = [];
  chart: any;
  borderColor: string = '';
  labels: string[] = [];
  data: number[] = [];

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private cdRef: ChangeDetectorRef) {}

  createChart() {
    this.chart = new Chart(this.scoreType, {
      type: 'line',
      data: {
        labels: this.labels, 
	      datasets: [
          {
            label: "Overall Score",
            data: this.data,
            fill: false,
            tension: 0.5,
            borderColor: this.borderColor,
            pointStyle: false,
            pointBackgroundColor: '#1d4ed8'
          }  
        ]
      },
      options: {
        aspectRatio: 3,
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          x: {
            display: false,
            ticks: {
              display: false,
              font: {
                family: 'Inter'
              }
            },
            grid: {
              display: false
            },
            title: {
              display: false
            },
            
          },
          y: {
            type: 'linear',
            min: 2,
            max: 10,
            display: false
          }
        }
      }
    })
  }

  ngAfterViewInit() {
    this.createChart();
    this.chart.update();
    this.cdRef.detectChanges();
    if (this.chart) {
      const ctx = this.chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#EDE5FA');
      gradient.addColorStop(1, '#EDE5FA');
      this.chart.data.datasets[0].backgroundColor = gradient;
      this.chart.update();
    }
  }

  ngOnInit() {
    if (this.score) this.score = Math.round(this.score * 100) / 10;
    this.reports = this.route.snapshot.data.reports;
    this.reports.sort((a: Report, b: Report) => {
      return a.id - b.id;
    });
    if (this.scoreType === 'fit') {
      this.data = this.reports.map(report => Math.round(report.fit_score * 100) / 10);
      this.borderColor = '#1d4ed8';
    } else if (this.scoreType === 'color') {
      this.data = this.reports.map(report => Math.round(report.color_score * 100) / 10);
      this.borderColor = '#db2777';
    } else if (this.scoreType === 'quality') {
      this.data = this.reports.map(report => Math.round(report.quality_score * 100) / 10);
      this.borderColor = '#f97316';
    } 
    this.labels = this.reports.map(report => {
      return this.datePipe.transform(report.date, 'MMMM d, yyyy') || "";
    });    
  }

  ngOnDestroy() {
    this.chart.destroy();
  }
}
