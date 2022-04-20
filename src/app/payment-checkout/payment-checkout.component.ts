import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WindowRefService } from '../core/window-ref.service';
import swal from 'sweetalert2';
import { SweetAlertService } from '../core/sweet-alert.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as Events from 'src/assets/data/events.json';
import { HelperService } from '../core/helper.service';
import { HttpApiService } from '../core/httpApi.service';

@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.css'],
  providers: [WindowRefService],
})
export class PaymentCheckoutComponent implements OnInit, AfterViewInit {
  constructor(
    private winRef: WindowRefService,
    private sweetAlertService: SweetAlertService,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private httpApiService: HttpApiService,
    private router: Router
  ) {}
  @ViewChild('buy') buyBtn: ElementRef;
  currEvent: any;
  currUser: any;

  ngAfterViewInit(): void {
    this.buyBtn.nativeElement?.addEventListener('click', async (e: Event) => {
      this.helperService.showLoader();
      const orderId = await this.getOrder();
      const rzp1 = this.checkout(orderId);
      rzp1.open();
      e.preventDefault();
    });
  }
  ngOnInit(): any {
    this.route.params.subscribe((param) => {
      this.currEvent = Events[param.id - 1];
      this.currUser = this.helperService.getUserData();
      if (Object.keys(this.currUser).length == Object.keys({}).length) {
        this.sweetAlertService.onSimpleAlert(
          'Please fill your details first !!!'
        );
        setTimeout(() => {
          this.sweetAlertService.closeCurrentAlert();
          this.router.navigate(['/event-register', param.id]);
        }, 2000);
      }
    });
    this.helperService.showLoader();
    setTimeout(() => {
      this.helperService.hideLoader();
    }, 1000);

    // const RAZORPAY_KEY_ID = 'rzp_test_WlBgo8OR3byC56'; // TEST ID;
    const RAZORPAY_KEY_ID = 'rzp_live_3N60iCxd96C4aR'; // Live ID;
    if (!RAZORPAY_KEY_ID) {
      throw new Error('Please mention key id in index.html file');
    }
  }

  async getOrder() {
    const orderDetails = await this.postData(
      'https://backend.geeksforgeekscuh.tech/create/order',
      {}
    );
    this.helperService.hideLoader();
    return orderDetails.id;
  }

  // Example POST method implementation:
  async postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  checkout(orderId: any) {
    console.log(orderId);
    const options = {
      key: 'rzp_live_3N60iCxd96C4aR', // Enter the Key ID generated from the Dashboard
      amount: '5000', // Amount is in currency subunits. Default currency is INR. Hence, 100 refers to 100 paise
      currency: 'INR',
      name: 'GFG SC CUH',
      description: 'Event Registration Fee',
      image: 'https://geeksforgeekscuh.tech/assets/images/gfg-logo.png',
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the previous step
      handler: async (response: any) => {
        const paymentId = response.razorpay_payment_id;
        const rzpOrderId = response.razorpay_order_id;
        const signature = response.razorpay_signature;

        // this.sweetAlertService.onSimpleAlert('Order success. Verifying....');
        console.log('Order success. Verifying....');
        const verificationResponse = await this.postData(
          'https://backend.geeksforgeekscuh.tech/verify',
          {
            razorpay_order_id: rzpOrderId,
            razorpay_payment_id: paymentId,
            razorpay_signature: signature,
          }
        );
        // this.sweetAlertService.closeCurrentAlert();
        console.log(verificationResponse.signatureIsValid);
        if (verificationResponse.signatureIsValid == 'true') {
          this.helperService.showLoader();
          this.httpApiService
            .registerForEvent(this.currUser)
            .subscribe((res: any) => {
              this.helperService.hideLoader();
              if (res?.data.code == 200) {
                console.log(res);
                this.sweetAlertService.onPaymentSuccess(
                  'Registered Successfully',
                  'Check your email for event details, have a nice day :)',
                  'success'
                );
              }
            });
        } else {
          this.sweetAlertService.onErrorAlert(
            'Payment Unsuccessful',
            'Dont worry!, if money deducted, will returned to your account in 5-7 days',
            'error'
          );
        }
        // alert('isSignatureValid: ' + verificationResponse.signatureIsValid);
      },
      prefill: {
        name: 'USER NAME',
        email: `${this.currUser.email}`,
        contact: `${this.currUser.phone}`,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#2f8d46',
      },
    };

    // const options = {
    //   key: 'rzp_live_3N60iCxd96C4aR', // Enter the Key ID generated from the Dashboard
    //   amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //   currency: 'INR',
    //   name: 'Acme Corp',
    //   description: 'Test Transaction',
    //   image: 'https://example.com/your_logo',
    //   order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //   callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
    //   prefill: {
    //     name: 'Gaurav Kumar',
    //     email: 'gaurav.kumar@example.com',
    //     contact: '9999999999',
    //   },
    //   notes: {
    //     address: 'Razorpay Corporate Office',
    //   },
    //   theme: {
    //     color: '#3399cc',
    //   },
    // };
    const rzp1 = new this.winRef.nativeWindow.Razorpay(options);
    console.log(options);

    rzp1.on('payment.failed', (response: any) => {
      console.log('Error in Payment!!!');
      // this.sweetAlertService.onErrorAlert(
      //   response.error.description,
      //   'Note down order ID for future reference : ' +
      //     response.error.metadata.order_id,
      //   'error'
      // );
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });

    return rzp1;
  }

  dateFormat() {
    if (+this.currEvent.eventDate.slice(13, 15) == 12) {
      return this.currEvent.eventDate.slice(13, 19) + ' PM';
    } else {
      if (+this.currEvent.eventDate.slice(13, 15) < 12) {
        return this.currEvent.eventDate.slice(13, 19) + ' AM';
      } else {
        return (
          +this.currEvent.eventDate.slice(13, 15) -
          12 +
          this.currEvent.eventDate.slice(15, 18) +
          ' PM'
        );
      }
    }
  }

  roomFormat() {
    return this.currEvent.eventLocation.split(',')[0];
  }
  addressFormat() {
    let fullAddress = '';
    this.currEvent.eventLocation.split(',').forEach((address: any, i: any) => {
      if (i > 0) {
        fullAddress += ' ' + address;
      }
    });
    return fullAddress;
  }
}
