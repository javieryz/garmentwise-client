import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private API_URL = 'http://ec2-35-180-85-206.eu-west-3.compute.amazonaws.com:5000/dashboard';

  constructor(private http: HttpClient) { }

  getReviewsByPage(report_id: number, page: number) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });

    return this.http
      .get<Review[]>(this.API_URL + '/reports/' + report_id + '/reviews?page=' + page, { headers });
  }
}
