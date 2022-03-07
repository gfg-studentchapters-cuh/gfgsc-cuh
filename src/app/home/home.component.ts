import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as Events from 'src/assets/data/events.json';
import { HelperService } from '../core/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private helperService: HelperService, private router: Router) {}
  pastEvents: any[] = [];
  events: any[] = [];
  futureEvents: any[] = [];

  ngOnInit(): void {
    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 2000);

    this.events = Array.from(Events);
    this.events.forEach((event) => {
      if (event.eventEnded) {
        this.pastEvents.push(event);
      } else {
        this.futureEvents.push(event);
      }
    });
  }

  goToPastEvents() {
    this.router.navigate(['events']);
  }
}
