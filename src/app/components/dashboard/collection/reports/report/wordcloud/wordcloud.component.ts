import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';
import { DashboardService } from 'src/app/services/dashboard.service';

Chart.register(WordCloudController, WordElement);

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.css']
})
export class WordcloudComponent implements OnInit {
  @Input() report_id: number | undefined = -1;

  wordCount: any;
  chart: any;

  constructor(private dashboardService: DashboardService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.report_id) {
      this.dashboardService.getReportWordCount(this.report_id).subscribe({
        next: (res) => {
          this.wordCount = Object.entries(res.word_count).map(([word, countObject]) => {
            const count = (countObject as { count: number }).count;
            return { key: word, value: count };
          });
          console.log(this.wordCount)
          this.createChart();
        }
      });
    }
  } 

  createChart() {
    this.chart = new Chart("canvas", {
      type: "wordCloud",
      data: {
        labels: this.wordCount.map((word: any) => word.key),
        datasets: [
          {
            label: "",
            data: this.wordCount.map((word: any) => word.value),
            color: '#525252',
          }
        ]
      },
      options: {
        responsive: true,
        elements: {
          word: {
            size: function(context) {
              var value = context.dataset.data[context.dataIndex] as unknown as number;
              console.log(value)
              return value/100 * 20;
            },
            hoverColor: "#000000",
            family: 'Helvetica',
            padding: 3
          }
        },
        wordCloud: {
          
        },
        plugins: {  
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#FFFFFF',
            borderColor: '#f5f5f5',
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
        }
      }
    });
  }

}