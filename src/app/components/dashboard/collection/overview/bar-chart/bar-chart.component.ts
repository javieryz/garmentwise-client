import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Collection } from 'src/app/models/collection';
import { Report } from 'src/app/models/report';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnDestroy, OnInit, AfterViewInit {
  collection: Collection = { user_id: -1, name: "", id: -1 };
  reports: Report[] = [];
  
  chart: any;
  labels: string[] = [];
  fitData: number[] = [];
  colorData: number[] = [];
  qualityData: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  createChart() {
    this.chart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: this.labels, 
	      datasets: [
          {
            label: 'Fit',
            data: this.fitData,
            backgroundColor: '#6366f1',
            borderRadius: 4,
            borderSkipped: false,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          },
          {
            label: 'Color',
            data: this.colorData,
            backgroundColor: '#fb7185',
            borderRadius: 4,
            borderSkipped: false,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          },
          {
            label: 'Quality',
            data: this.qualityData,
            backgroundColor: '#fcd34d',
            borderRadius: 4,
            borderSkipped: false,
            barPercentage: 0.6,
            categoryPercentage: 0.5,
          }
        ]
      },
      options: {
        interaction: {
          intersect: false,
          mode: 'index',
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            backgroundColor: '#fafafa',
            borderColor: '#fafafa',
            borderWidth: 2,
            titleColor: 'black',
            displayColors: false,
            bodyColor: 'black',
            padding: 14,
            caretSize: 0,
            titleFont: {
              size: 17,
              family: 'Inter',
              weight: 'normal'
            },
            bodyFont: {
              size: 13,
              family: 'Inter',
            },
            yAlign: 'bottom'
          }
        },
        scales: {
          x: {
            border: {
              display: false
            },
            ticks: {
              display: true,
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
            border: {
              display: false
            },
            beginAtZero: true,
            ticks: {
              font: {
                family: 'Inter'
              },
              stepSize: 200
            },
            grid: {
              display: true
            }
          }
        }
      }
    });
  }


  ngAfterViewInit() {
    if (this.chart) {

    }
  }
  ngOnInit() {
    this.reports = this.route.snapshot.data.reports;
    this.fitData = this.reports.map(report => report.fit_reviews);
    this.colorData = this.reports.map(report => report.color_reviews);
    this.qualityData = this.reports.map(report => report.quality_reviews);
    this.labels = this.reports.map(report => {
      return this.datePipe.transform(report.date, 'MMM d, yyyy') || "";
    });    

    this.createChart();
  }

  ngOnDestroy() {
    this.chart.destroy();
  }
}
