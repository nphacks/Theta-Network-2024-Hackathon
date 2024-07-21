import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  getAllTimelineData() {
    let data = this.http.get('http://localhost:3000/timeline/1')
    console.log('GHello', data)
    return data
  }

  createTimeline(data: any) {
    return this.http.post('http://localhost:3000/timeline', data)
  }
}
