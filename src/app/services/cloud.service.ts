import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root',
})
export class CloudService {
  apiBaseUrl: string = 'https://puneriawaz.herokuapp.com/api/v1/';
  constructor(private http: HttpClient) {}

  public getSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>('https://iocare.in/api/schedules');
  }
  public getRecordings(): Observable<any[]> {
    return this.http.get<any[]>('https://iocare.in/api/recordings');
  }
  public getSettings(): Observable<any[]> {
    return this.http.get<any[]>('https://iocare.in/api/settings');
  }
  public getNews(): Observable<any[]> {
    return this.http.get<any[]>('https://iocare.in/api/schedules');
  }
  public geListeners(): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
    const headers = new HttpHeaders({});
    return this.http.get<any>('https://icecast.bkwsu.eu/status-json.xsl', {
      headers,
    });
  }
  getFixedJson(): Observable<any> {
    return this.http
      .get('https://icecast.bkwsu.eu/status-json.xsl', {
        responseType: 'text' as const,
      })
      .pipe(
        map((response) => this.safeParseJson(response)),
        catchError((error) => {
          console.error('Request error:', error);
          return of(null);
        })
      );
  }
  private safeParseJson(raw: string): any {
    try {
      // Optional: fix common formatting issues
      const cleaned = this.fixMalformedJson(raw);
      return JSON.parse(cleaned);
    } catch (err) {
      console.error('Malformed JSON:', err);
      return null;
    }
  }

  private fixMalformedJson(json: string): string {
    return json
      .replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
      .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // Quote keys
      .replace(/'/g, '"') // Replace single quotes with double quotes
      .replace(/"title":-/g, '"title":-0'); // Replace single quotes with double quotes
  }
  public postFeedback(data: any): Observable<any[]> {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>(this.apiBaseUrl + 'feedback', data);
  }

  public postJoin(data: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiBaseUrl + 'join', data);
  }
}
