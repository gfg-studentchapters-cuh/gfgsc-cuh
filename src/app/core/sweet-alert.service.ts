import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor(private router: Router) {}
  alertSuccess = new Subject<boolean>();
  alertError = new Subject<boolean>();
  alertConfirm = new Subject<boolean>();

  onSimpleAlert(message: any) {
    swal.fire(message);
  }
  onSuccessAlert(title: any, description: any, type: any) {
    swal.fire(title, description, type);
  }
  onErrorAlert(title: any, description: any, type: any) {
    swal.fire(title, description, type);
  }
  onConfirmAlert() {}

  closeCurrentAlert() {
    swal.close();
  }

  onPaymentSuccess(title: any, description: any, type: any) {
    swal.fire(title, description, type).then(() => {
      this.router.navigate(['/events']);
    });
  }

  // confirmBox() {
  //   swal
  //     .fire({
  //       title: 'Are you sure want to remove?',
  //       text: 'You will not be able to recover this file!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, delete it!',
  //       cancelButtonText: 'No, keep it',
  //     })
  //     .then((result) => {
  //       if (result.value) {
  //         swal.fire(
  //           'Deleted!',
  //           'Your imaginary file has been deleted.',
  //           'success'
  //         );
  //       } else if (result.dismiss === swal.DismissReason.cancel) {
  //         swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
  //       }
  //     });
  // }
}
