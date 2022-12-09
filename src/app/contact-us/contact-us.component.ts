import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HelperService } from '../core/helper.service';
import { HttpApiService } from '../core/httpApi.service';
import { SweetAlertService } from '../core/sweet-alert.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  constructor(
    private helperService: HelperService,
    private httpApiService: HttpApiService,
    private sweetAlertService: SweetAlertService
  ) {}

  contactUsForm = new FormGroup({
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
    message: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 1000);
  }

  onContactUs() {
    console.log(this.contactUsForm.value);
    if (this.contactUsForm.valid) {
      this.helperService.showLoader();
      this.httpApiService.contactUs(this.contactUsForm.value).subscribe(
        (res) => {
          this.helperService.hideLoader();
          this.contactUsForm.reset();
          this.sweetAlertService.onSuccessAlert(
            'Thankyou for your feedback',
            'We will get back to you soon ;)',
            'success'
          );
        },
        (err) => {
          this.helperService.hideLoader();
          console.log(err.message);
        }
      );
      console.log(this.contactUsForm.value);
    }
  }
}
