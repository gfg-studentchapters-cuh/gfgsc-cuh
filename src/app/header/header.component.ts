import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private renderer: Renderer2) {}
  @ViewChild('navbar') navbar: ElementRef<HTMLElement> = {} as ElementRef;
  searchForm: HTMLElement | null = null;
  cartItem: HTMLElement | null = null;

  ngOnInit(): void {
    this.searchForm = document.querySelector('.search-form');
    this.cartItem = document.querySelector('.cart-items-container');
  }

  ngAfterViewInit(): void {
    this.navbar.nativeElement.querySelectorAll('a').forEach((menuLink) => {
      menuLink.addEventListener('click', () => {
        this.renderer.removeClass(this.navbar.nativeElement, 'active');
      });
    });
  }

  onClickMenuButton() {
    this.navbar.nativeElement.classList.toggle('active');
    this.searchForm?.classList.remove('active');
    this.cartItem?.classList.remove('active');
    console.log(this.navbar.nativeElement.querySelectorAll('a'));
  }

  onClickCartButton() {
    console.log(this.cartItem, this.navbar, this.searchForm);
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
