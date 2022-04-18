import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  isLoading = new Subject<boolean>();
  currEventId = new Subject<number>();
  currUser: any = {};

  showLoader() {
    this.isLoading.next(true);
  }
  hideLoader() {
    this.isLoading.next(false);
  }

  putUserData(data: {}) {
    this.currUser = data;
  }
  getUserData() {
    const tempUserData = this.currUser;
    this.currUser = {};
    return tempUserData;
  }
  constructor() {}
}
