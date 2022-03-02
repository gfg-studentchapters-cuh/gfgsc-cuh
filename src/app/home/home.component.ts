import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as Events from 'src/assets/data/events.json';
import { HelperService } from '../core/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 2000);
  }
}
