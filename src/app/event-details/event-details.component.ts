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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit, AfterViewInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  @ViewChild('about') aboutDiv: ElementRef | undefined;
  @ViewChild('winners') winnersDiv: ElementRef | undefined;
  @ViewChild('day') dayEL: ElementRef;
  @ViewChild('hour') hourEl: ElementRef;
  @ViewChild('minute') minuteEL: ElementRef;
  @ViewChild('second') secondEL: ElementRef;

  ngAfterViewInit(): void {}

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
      console.log(this.event);
      this.countDate = new Date(this.event.eventDate).getTime();
      console.log(this.event.rulesAndRegulations);
      console.log(this.event.winners);
      console.log(this.event);
      this.callCounter(this.countDate);
    });
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