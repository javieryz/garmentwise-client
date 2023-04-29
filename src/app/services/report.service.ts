import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private API_URL = 'http://localhost:8000/dashboard';

  constructor(private http: HttpClient) { }

  getUserCollections(): Observable<Report[]> {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + JSON.parse(sessionStorage.getItem('currentUserToken')!)
    });

    return this.http.get<any>(this.API_URL + '/report/reports', { headers }).pipe(
      map(response => {
        return Object.entries(response).map(([id, title]) => {
          return { id: parseInt(id), title } as unknown as Report;
        });
      })
    );
  }
}
