import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  constructor() {}
  closeBtn = document.querySelectorAll('.close-modal');

  ngOnInit(): void {
    this.showModal('open-modal', 'modal-container');
    this.closeBtn.forEach((c) => c.addEventListener('click', this.closeModal));
  }

  /*=============== SHOW MODAL ===============*/
  showModal(openButton: any, modalContent: any) {
    const openBtn = document.getElementById(openButton),
      modalContainer = document.getElementById(modalContent);

    if (openBtn && modalContainer) {
      openBtn.addEventListener('click', () => {
        modalContainer.classList.add('show-modal');
      });
    }
  }

  /*=============== CLOSE MODAL ===============*/

  closeModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer?.classList.remove('show-modal');
  }
}
