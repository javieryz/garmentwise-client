import { Component, Input, OnChanges } from '@angular/core';
import { Review } from 'src/app/models/review';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnChanges {
  @Input() report_id: number | undefined = -1;
  @Input() reviews: Review[] | null = null;

  expanded: boolean[] = new Array();
  currentPage: number = 1;

  constructor(private reviewsService: ReviewsService) {}
  
  ngOnChanges() {
    if (this.reviews) {
      this.expanded = new Array(this.reviews.length).fill(false);
    }
  }

  isExpanded(review_number: number) {
    return this.expanded[review_number];
  }

  toggleExpansion(review_number: number) {
    this.expanded[review_number] = !this.expanded[review_number];
  }

  nextPage() {
    this.currentPage++;
    this.getReviews();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getReviews();
    }
  }

  getReviews() {
    if (this.report_id)
      this.reviewsService.getReviewsByPage(this.report_id, this.currentPage).subscribe({
        next: (reviews) => {
          this.reviews = reviews;
        }
      });
  }
}