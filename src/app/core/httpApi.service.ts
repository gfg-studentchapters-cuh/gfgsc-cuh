import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  constructor(private http: HttpClient) {}
  EVENT_REG_URL = 'https://regapi.pythonanywhere.com/api/';

  //   headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //   });
  //   httpOptions = { headers: this.headers };

  registerForEvent(data: any) {
    return this.http.post(this.EVENT_REG_URL, data);
  }
}
