import { Component, OnInit } from '@angular/core';
import { HelperService } from '../core/helper.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 1000);
  }
}
