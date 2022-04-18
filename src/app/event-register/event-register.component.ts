import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '../core/helper.service';
import * as Events from 'src/assets/data/events.json';
import { Event } from '../event-details/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApiService } from '../core/httpApi.service';
import { SweetAlertService } from '../core/sweet-alert.service';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css'],
})
export class EventRegisterComponent implements OnInit {
  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private httpApiService: HttpApiService,
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) {}
  @ViewChild('eventTitle') eventTitleElm: ElementRef;
  eventTitle: any;
  eventId: any;
  currEvent: any;

  eventRegistrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z ]*$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.email,
    ]),
    rollNo: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[0-9]+$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[0-9]+$/),
    ]),
    branch: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit(): void {
    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 1000);
    this.route.params.subscribe((param) => {
      this.eventId = param.id;
      this.currEvent = Events[param.id - 1];
      if (this.currEvent.eventEnded) {
        this.sweetAlertService.onSimpleAlert(
          'Oh!, You missed it, this event has ended, redirecting you to our upcoming events'
        );
        setTimeout(() => {
          this.sweetAlertService.closeCurrentAlert();
          this.router.navigate(['/events']);
        }, 2000);
      }
      this.eventTitle =
        this.currEvent?.eventTitle1 +
        ' ' +
        this.currEvent?.eventTitle2 +
        ' ' +
        this.currEvent.eventType;
    });
  }

  onRegister() {
    if (this.eventRegistrationForm.invalid) {
      this.sweetAlertService.onErrorAlert(
        'Please check',
        'details seems incomplete or invalid',
        'error'
      );
    } else {
      if (!this.currEvent.isEventFree) {
        this.helperService.putUserData(this.eventRegistrationForm.value);
        this.router.navigate(['/checkout', this.eventId]);
      } else {
        this.helperService.showLoader();
        this.httpApiService
          .registerForEvent(this.eventRegistrationForm.value)
          .subscribe((res: any) => {
            this.eventRegistrationForm.reset();
            if (res?.data.code == 200) {
              console.log(res);
              this.helperService.hideLoader();
              this.sweetAlertService.onSuccessAlert(
                'Registered Successfully',
                'See you in the event! Have a nice Day :)',
                'success'
              );
            }
          });
      }
    }
  }
}
