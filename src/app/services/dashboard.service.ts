import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Collection } from '../models/collection';
import { Report } from '../models/report';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_URL = 'http://localhost:8000/dashboard';

  constructor(private http: HttpClient) { }

  createReport(reportName: string, collection_id: number, fileInput: File): Observable<Report> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });
    const formData = new FormData();
    formData.append('report_name', reportName);
    formData.append('collection_id', String(collection_id));
    formData.append('file', fileInput);

    return this.http.post<Report>(this.API_URL + '/reports/create', formData, { headers });
  }

  createCollection(collectionName: string): Observable<Collection> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!),
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "collection_name": collectionName
    }

    return this.http.post<Collection>(this.API_URL + '/collections/create', requestBody, { headers });
  }

  getUserCollections(): Observable<Collection[]> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });

    return this.http.get<Collection[]>(this.API_URL + '/collections', { headers });
  }

  getCollection(collectionId: number): Observable<Collection> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });

    return this.http.get<Collection>(this.API_URL + '/collections/' + collectionId, { headers })
  }

  getCollectionReports(collection: Collection): Observable<Report[]> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });
  
      return this.http.get<Report[]>(this.API_URL + '/collections/' + collection.id + '/reports', { headers });
  }

  getReport(reportId: number): Observable<Report> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });

    return this.http.get<Report>(this.API_URL + '/reports/' + reportId, { headers })
  }

  getReportReviews(reportId: number): Observable<Review[]> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });

    return this.http.get<Review[]>(this.API_URL + '/reports/' + reportId + '/reviews', { headers })
  }

  getReportWordCount(reportId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });

    return this.http.get<any>(this.API_URL + '/reports/' + reportId + '/word_count', { headers })
  }

  getReportWordcloud(reportId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });

    return this.http.get<any>(this.API_URL + '/reports/' + reportId + '/wordcloud', { headers })
  }

  deleteCollection(collection_id: number) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });

    return this.http.delete(this.API_URL + '/collections/' + collection_id, { headers });
  }

  deleteReport(report_id: number) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });
    return this.http.delete(this.API_URL + '/reports/' + report_id, { headers });
  }
}
