import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Images from 'src/assets/data/gallery.json';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit, AfterViewInit {
  constructor() {}
  gallery: any;
  altura: any;
  gap: any;
  gitem: any;
  imgGallery: any[];

  ngAfterViewInit(): void {
    console.log(this.imgGallery);
    this.imgGallery = Array.from(Images)[0].images;
    this.gallery = document.querySelector('#gallery');

    // window.addEventListener('resize', this.resizeAll);

    this.gallery.querySelectorAll('.gallery-item').forEach((item: any) => {
      let el = item;
      el.style.gridRowEnd =
        'span ' +
        Math.ceil((this.getHeight(item) + this.gap) / (this.altura + this.gap));
    });

    this.gallery.querySelectorAll('img').forEach((item: any) => {
      // item.classList.add('byebye');
      item.addEventListener('load', () => {
        this.altura = this.getVal(this.gallery, 'grid-auto-rows');
        this.gap = this.getVal(this.gallery, 'grid-row-gap');
        this.gitem = item?.parentElement?.parentElement;
        this.gitem.style.gridRowEnd =
          'span ' +
          Math.ceil(
            (this.getHeight(this.gitem) + this.gap) / (this.altura + this.gap)
          );
        // item.classList.remove('byebye');
      });

      // if (item.complete) {
      //   // console.log(item.src);
      // } else {
      //   item.addEventListener('load', () => {
      //     this.altura = this.getVal(this.gallery, 'grid-auto-rows');
      //     this.gap = this.getVal(this.gallery, 'grid-row-gap');
      //     this.gitem = item?.parentElement?.parentElement;
      //     this.gitem.style.gridRowEnd =
      //       'span ' +
      //       Math.ceil(
      //         (this.getHeight(this.gitem) + this.gap) / (this.altura + this.gap)
      //       );
      //     // item.classList.remove('byebye');
      //   });
      // }
    });

    this.gallery
      .querySelectorAll('.gallery-item')
      .forEach(function (item: any) {
        item.addEventListener('click', function () {
          item.classList.toggle('full');
        });
      });
  }
  ngOnInit(): void {
    this.imgGallery = Array.from(Images)[0].images;
  }

  getVal(elem: any, style: any) {
    console.log(
      parseInt(window.getComputedStyle(elem).getPropertyValue(style))
    );
    return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
  }

  getHeight(item: any) {
    console.log(item.querySelector('.content').getBoundingClientRect().height);
    return item.querySelector('.content').getBoundingClientRect().height;
  }

  resizeAll() {
    this.altura = this.getVal(this.gallery, 'grid-auto-rows');
    this.gap = this.getVal(this.gallery, 'grid-row-gap');
  }
}
