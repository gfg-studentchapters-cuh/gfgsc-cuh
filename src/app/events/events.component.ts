import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as Events from 'src/assets/data/events.json';
import { HelperService } from '../core/helper.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  @ViewChild('past') pastEventDiv: ElementRef;
  pastEvents: any[] = [];
  events: any[] = [];
  constructor(private router: Router, private helperService: HelperService) {}
  ngOnInit(): void {
    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 1000);

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
    this.pastEventDiv.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000,
    navText: [
      `<i class="fa fa-caret-left" aria-hidden="true"></i>`,
      `<i class="fa fa-caret-right" aria-hidden="true"></i>`,
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  futureEvents: any[] = [];
}
