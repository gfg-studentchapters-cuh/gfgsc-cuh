import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HelperService } from '../core/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  currentPage: any;
  bannerVisibility: any = false;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private helperService: HelperService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentPage = val.url.slice(1);
      }
    });
  }
  @ViewChild('navbar') navbar: ElementRef<HTMLElement> = {} as ElementRef;
  searchForm: HTMLElement | null = null;
  cartItem: HTMLElement | null = null;

  ngOnInit(): void {
    this.searchForm = document.querySelector('.search-form');
    this.cartItem = document.querySelector('.cart-items-container');
    this.helperService.showBanner();
    this.helperService.bannerVisibility.subscribe((val) => {
      this.bannerVisibility = val;
    });
  }

  ngAfterViewInit(): void {
    this.navbar.nativeElement.querySelectorAll('a').forEach((menuLink) => {
      menuLink.addEventListener('click', () => {
        this.renderer.removeClass(this.navbar.nativeElement, 'active');
      });
    });
  }

  closeBanner() {
    this.bannerVisibility = false;
  }

  onClickMenuButton() {
    this.navbar.nativeElement.classList.toggle('active');
    this.searchForm?.classList.remove('active');
    this.cartItem?.classList.remove('active');
  }

  onClickCartButton() {
    this.cartItem?.classList.toggle('active');
    this.navbar.nativeElement.classList.remove('active');
    this.searchForm?.classList.remove('active');
  }

  onClickSearchButton() {
    this.searchForm?.classList.toggle('active');
    this.navbar.nativeElement.classList.remove('active');
    this.cartItem?.classList.remove('active');
  }

  onClickCalender() {
    this.router.navigate(['events']);
  }

  // window.onscroll = () => {
  //   navbar.classList.remove('active');
  //   searchForm.classList.remove('active');
  //   cartItem.classList.remove('active');
  // };
}
