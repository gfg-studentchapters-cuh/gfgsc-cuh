import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  navbar: HTMLElement | null = null;
  searchForm: HTMLElement | null = null;
  cartItem: HTMLElement | null = null;

  ngOnInit(): void {
    this.navbar = document.querySelector('.navbar');
    this.searchForm = document.querySelector('.search-form');
    this.cartItem = document.querySelector('.cart-items-container');
  }

  onClickMenuButton() {
    this.navbar?.classList.toggle('active');
    this.searchForm?.classList.remove('active');
    this.cartItem?.classList.remove('active');
  }

  onClickCartButton() {
    console.log(this.cartItem, this.navbar, this.searchForm);
    this.cartItem?.classList.toggle('active');
    this.navbar?.classList.remove('active');
    this.searchForm?.classList.remove('active');
  }

  onClickSearchButton() {
    this.searchForm?.classList.toggle('active');
    this.navbar?.classList.remove('active');
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
