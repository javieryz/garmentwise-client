import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  reports: Report[] = [];
  overallScore: number = 0;
  fitScore: number = 0;
  colorScore: number = 0;
  qualityScore: number = 0;
  overallReviews: number = 0;
  fitReviews: number = 0;
  colorReviews: number = 0;
  qualityReviews: number = 0;
  dataType: string = "overall";

  constructor(private route: ActivatedRoute, private collectionService: CollectionService) {}

  ngOnInit() {
    const reports = this.route.snapshot.data.reports;
    this.reports = reports;
    [this.overallScore, this.fitScore, this.colorScore, this.qualityScore] = this.collectionService.getAverageScores(reports);
    [this.overallReviews, this.fitReviews, this.colorReviews, this.qualityReviews] = this.collectionService.getTotalReviews(reports);
  }

  changeScoreChart(dataType: string) {
    this.dataType = dataType;
  }
}