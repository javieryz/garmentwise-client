import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';
import { Collection } from 'src/app/models/collection';
import { Report } from 'src/app/models/report';

@Component({
  selector: 'app-score-chart',
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.css']
})
export class ScoreChartComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() dataType: string = 'overall';
  collection: Collection = { user_id: -1, name: "", id: -1 };
  reports: Report[] = [];
  
  chart: any;
  labels: string[] = [];
  currentData: number[] = [];
  overallData: number[] = [];
  fitData: number[] = [];
  colorData: number[] = [];
  qualityData: number[] = [];

  viewInitialized: boolean = false;
  currentColor: string = "#6d28d9";

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  createChart() {
    this.chart = new Chart("lineChart", {
      type: 'line',
      data: {
        labels: this.labels, 
	      datasets: [
          {
            label: "Score",
            data: this.overallData,
            fill: 'origin',
            tension: 0.5,
            borderColor: '#6d28d9',
            pointBackgroundColor: '#6d28d9'
          }  
        ]
      },
      options: {
        interaction: {
          intersect: false,
          mode: 'index',
        },
        responsive: true,
        aspectRatio: 5,
        plugins: {
          legend: {
            display: false,
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
              display: true
            },
            title: {
              display: false
            },
            
          },
          y: {
            type: 'linear',
            beginAtZero: true,
            max: 10,
            display: false,
            ticks: {
              display: true,
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
    })
  }

  changeGradient() {
    const ctx = this.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, this.hexToRGBA(this.currentColor, 0.5));
    gradient.addColorStop(1, '#FFFFFF');
    this.chart.data.datasets[0].backgroundColor = gradient;
    this.chart.update();
  }

  hexToRGBA(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  ngAfterViewInit() {
    if (this.chart) {
      this.changeGradient();
      this.viewInitialized = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataType && this.viewInitialized) {
      if (changes.dataType.currentValue == 'overall') {
        this.currentData = this.overallData;
        this.currentColor = "#6d28d9";
      }
      if (changes.dataType.currentValue == 'fit') {
        this.currentData = this.fitData;
        this.currentColor = "#1d4ed8";
      }
      if (changes.dataType.currentValue == 'color') {
        this.currentData = this.colorData;
        this.currentColor = "#db2777";
      }
      if (changes.dataType.currentValue == 'quality') {
        this.currentData = this.qualityData;
        this.currentColor = "#f97316";
      }
      this.chart.data.datasets[0].data = this.currentData;
      this.chart.data.datasets[0].borderColor = this.currentColor;
      this.chart.data.datasets[0].pointBackgroundColor = this.currentColor;
      this.changeGradient();
      this.chart.update();
    }
  }

  ngOnInit() {
    this.reports = this.route.snapshot.data.reports;
    this.reports.sort((a: Report, b: Report) => {
      return a.id - b.id;
    });
    this.overallData = this.reports.map(report => Math.round(report.overall_score * 100) / 10);
    this.fitData = this.reports.map(report => Math.round(report.fit_score * 100) / 10);
    this.colorData = this.reports.map(report => Math.round(report.color_score * 100) / 10);
    this.qualityData = this.reports.map(report => Math.round(report.quality_score * 100) / 10);
    this.labels = this.reports.map(report => {
      return this.datePipe.transform(report.date, 'MMM d, yyyy') || "";
    });    

    this.createChart();
  }

  ngOnDestroy() {
    this.chart.destroy();
  }
}