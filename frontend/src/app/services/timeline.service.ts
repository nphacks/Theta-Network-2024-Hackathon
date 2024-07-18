import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  getAllTimelineData() {
    let data = this.http.get('http://localhost:3000/')
    console.log('GHello', data)
    return data
  }
}
