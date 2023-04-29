import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sentiment-card',
  templateUrl: './sentiment-card.component.html',
  styleUrls: ['./sentiment-card.component.css'],
})
export class SentimentCardComponent implements OnChanges {
  @Input() title: string | undefined = "";
  @Input() score: number | undefined = 0;
  @Input() numReviews: number | undefined = 0;
  @Input() scoreType: string | undefined = "";

  constructor() {}

  ngOnChanges() {
    if (this.score) this.score = Math.round(this.score * 100) / 10;
  }
}
