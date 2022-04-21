import { HttpClient } from '@angular/common/http';
import * as Events from 'src/assets/data/events.json';
import { Event, Winners } from './event.model';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../core/helper.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit, AfterViewInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private router: Router
  ) {}
  @ViewChild('eventEntryBtn') eventEntryBtn: ElementRef | undefined;
  @ViewChild('about') aboutDiv: ElementRef | undefined;
  @ViewChild('winners') winnersDiv: ElementRef | undefined;
  @ViewChild('day') dayEL: ElementRef;
  @ViewChild('hour') hourEl: ElementRef;
  @ViewChild('minute') minuteEL: ElementRef;
  @ViewChild('second') secondEL: ElementRef;
  @ViewChild('prizeList') prizeListEl: ElementRef;

  ngAfterViewInit(): void {
    if (!this.event?.prizes?.length) {
      console.log(this.prizeListEl.nativeElement);
      this.prizeListEl.nativeElement.style.display = 'none';
    }
    this.callCounter(this.countDate);

    this.eventEntryBtn?.nativeElement.addEventListener('click', () => {
      console.log('clicked');
      this.router.navigate(['/event-register', this?.event?.eventId]);
    });
  }

  entry() {
    this.router.navigate(['/event-register', this?.event?.eventId]);
  }

  countDate: number;
  eventId: number;
  event: Event;
  winners: Winners;
  d: number;
  h: number;
  m: number;
  s: number;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventId = params.id;
      this.event = Events[this.eventId - 1];
      this.countDate = new Date(this.event.eventDate).getTime();
    });

    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 1000);
  }

  callCounter(countDate: any) {
    setInterval(() => {
      this.newYear(countDate);
    }, 1000);
  }

  newYear(countDate: any) {
    let now = new Date().getTime();
    let gap = countDate - now;
    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    this.d = Math.floor(gap / day);
    this.h = Math.floor((gap % day) / hour);
    this.m = Math.floor((gap % hour) / minute);
    this.s = Math.floor((gap % minute) / second);

    if (this.s < 0) {
      this.dayEL.nativeElement.innerText = '00';
      this.hourEl.nativeElement.innerText = '00';
      this.minuteEL.nativeElement.innerText = '00';
      this.secondEL.nativeElement.innerText = '00';
    }
  }

  goToAbout() {
    this.aboutDiv?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  goToWinners() {
    this.winnersDiv?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }
}
