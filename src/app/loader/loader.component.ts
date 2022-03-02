import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelperService } from '../core/helper.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  constructor(private helperService: HelperService) {}
  showLoader: boolean = true;
  loadingSubscription: Subscription;
  ngOnInit(): void {
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 1000);
    this.loadingSubscription = this.helperService.isLoading.subscribe(
      (loading: boolean) => {
        this.showLoader = loading;
      }
    );
  }
}
