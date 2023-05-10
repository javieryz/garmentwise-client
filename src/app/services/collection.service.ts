import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Collection } from '../models/collection';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor() {}

  getAverageScores(reports: Report[]): [number, number, number, number] {
    let overallScore = 0, fitScore = 0, colorScore = 0, qualityScore = 0;
    for (let report of reports) {
      overallScore += report.overall_score;
      fitScore += report.fit_score;
      colorScore += report.color_score;
      qualityScore += report.quality_score;
    }
    overallScore = overallScore / reports.length;
    fitScore = fitScore / reports.length;
    colorScore = colorScore / reports.length;
    qualityScore = qualityScore / reports.length;

    return [overallScore, fitScore, colorScore, qualityScore];
  }

  getTotalReviews(reports: Report[]): [number, number, number, number] {
    let overallReviews = 0, fitReviews = 0, colorReviews = 0, qualityReviews = 0;
    for (let report of reports) {
      overallReviews += report.total_reviews;
      fitReviews += report.fit_reviews;
      colorReviews += report.color_reviews;
      qualityReviews = report.quality_reviews;
    }
    return [overallReviews, fitReviews, colorReviews, qualityReviews];
  }
}
