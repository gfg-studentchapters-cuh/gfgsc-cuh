import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  constructor(private http: HttpClient) {}
  EVENT_REG_URL = 'https://regapi.pythonanywhere.com/api/';
  CONTACT_US_URL = 'http://nilabh22.pythonanywhere.com/api/';
  REGISTER_URL = 'https://registration.pythonanywhere.com/api/register';

  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  // });
  // httpOptions = { headers: this.headers };

  registerForEvent(data: any) {
    return this.http.post(this.EVENT_REG_URL, data);
  }

  contactUs(data: any) {
    return this.http.post(this.CONTACT_US_URL, data);
  }
  registerWithUs(data: any) {
    return this.http.post(this.REGISTER_URL, data);
  }
}
