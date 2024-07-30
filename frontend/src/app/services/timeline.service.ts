import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../config';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient,private authService: AuthenticationService) { }

  createTimeline(timeline: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.authService.getToken())}`
    });
    return this.http.post(`${SERVER_URL}/timeline`, timeline, {headers: headers})
  }

  getTimelineData(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.authService.getToken())}`
    });
    return this.http.get(`${SERVER_URL}/timeline/id/${id}`, {headers: headers})
  }

  addEpisode(id: string, timeline: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.authService.getToken())}`
    });
    return this.http.patch(`${SERVER_URL}/timeline/id/${id}`, timeline, {headers: headers})
  }

  addParallelTimeline(id: string, timeline: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.authService.getToken())}`
    });
    return this.http.patch(`${SERVER_URL}/timeline/parallel/id/${id}`, timeline, {headers: headers})
  }

  getAllTimelinesOfAUser(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.authService.getToken())}`
    });
    return this.http.get(`${SERVER_URL}/timeline/creatorId/${id}`, {headers: headers})
  }

  getAllTimelinesOfAUserGroup(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.authService.getToken())}`
    });
    return this.http.get(`${SERVER_URL}/timeline/groups/${id}`, {headers: headers})
  }

  getAllTimelinesWithPublic() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.authService.getToken())}`
    });
    return this.http.get(`${SERVER_URL}/timeline/public`, {headers: headers})
  }

  getAllUsers() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.authService.getToken())}`
    });
    return this.http.get(`${SERVER_URL}/user`, {headers: headers})
  }

  generateImage(body: any) {
    return this.http.post(`${SERVER_URL}/theta/generate-image`, body, { responseType: 'blob' })
  }

  generateVideo(body: any) {
    console.log('Generate video')
    return this.http.post(`${SERVER_URL}/theta/generate-video`, body, { responseType: 'blob' })
  }
}
