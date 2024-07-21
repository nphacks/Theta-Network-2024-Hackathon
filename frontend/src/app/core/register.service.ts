import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(data: any) {
    return this.http.post('http://localhost:3000/api/user/register', data)
  }

  loginUser(data: any) {
    return this.http.patch('http://localhost:3000/api/user/login', data)
  }
}
