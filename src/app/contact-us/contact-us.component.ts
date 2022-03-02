import { Component, OnInit } from '@angular/core';
import { HelperService } from '../core/helper.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 1000);
  }
}
