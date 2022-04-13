import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[faq-type]',
})
export class FaqTypeDirective implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  target: HTMLElement;

  ngOnInit(): void {
    this.target = this.renderer.selectRootElement(this.element).nativeElement;
  }

  @HostListener('click') toggleFaq(event: Event) {
    let butts = this.target.firstElementChild as HTMLElement;
    let panel = this.target.nextElementSibling as HTMLElement;
    if (this.target.classList.contains('active')) {
      this.target.classList.toggle('active');
      butts.style.transform = 'rotate(360deg)';
      panel.style.maxHeight = '';
      this.target.classList.toggle('visited');
    } else {
      document.querySelectorAll('.questions').forEach((ques) => {
        ques.classList.remove('active');
        let but = ques.firstElementChild as HTMLElement;
        let pan = ques.nextElementSibling as HTMLElement;
        pan.style.maxHeight = '';
        but.style.transform = '';
      });
      this.target.classList.toggle('active');

      if (panel.style.maxHeight) {
        panel.style.removeProperty('maxHeight');
        butts.style.transform = 'rotate(360deg)';
        this.target.classList.toggle('visited');
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        butts.style.transform = 'rotate(180deg)';
      }
    }
  }
}
