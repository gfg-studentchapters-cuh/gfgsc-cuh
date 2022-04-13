import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WindowRefService } from '../core/window-ref.service';
@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.css'],
  providers: [WindowRefService],
})
export class PaymentCheckoutComponent implements OnInit, AfterViewInit {
  constructor(private winRef: WindowRefService) {}
  @ViewChild('buy') buyBtn: ElementRef;

  ngAfterViewInit(): void {
    this.buyBtn.nativeElement?.addEventListener('click', async (e: Event) => {
      const orderId = await this.getOrder();
      const rzp1 = this.checkout(orderId);
      rzp1.open();
      e.preventDefault();
    });
  }
  ngOnInit(): any {
    const RAZORPAY_KEY_ID = 'rzp_live_3N60iCxd96C4aR'; // Mentio your razorpay key id here;
    if (!RAZORPAY_KEY_ID) {
      throw new Error('Please mention key id in index.html file');
    }

    // document.getElementById('rzp-button1').onclick = async function (e) {
    //   const orderId = await getOrder();
    //   const rzp1 = checkout(orderId);
    //   rzp1.open();
    //   e.preventDefault();
    // };
  }

  async getOrder() {
    const orderDetails = await this.postData(
      'http://localhost:3000/create/order',
      {}
    );
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
    const options = {
      key: '', // Enter the Key ID generated from the Dashboard
      amount: '100', // Amount is in currency subunits. Default currency is INR. Hence, 100 refers to 100 paise
      currency: 'INR',
      name: 'GFG SC CUH',
      description: 'Event Transaction Test',
      image: 'assets/images/gfg-logo.png',
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the previous step
      handler: async (response: any) => {
        const paymentId = response.razorpay_payment_id;
        const rzpOrderId = response.razorpay_order_id;
        const signature = response.razorpay_signature;
        console.log('Order success. Verifying....');
        const verificationResponse = await this.postData(
          'http://localhost:3000/verify',
          {
            razorpay_order_id: rzpOrderId,
            razorpay_payment_id: paymentId,
            razorpay_signature: signature,
          }
        );
        alert('isSignatureValid: ' + verificationResponse.signatureIsValid);
      },
      prefill: {
        name: 'USER NAME',
        email: 'test@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new this.winRef.nativeWindow.Razorpay(options);

    rzp1.on('payment.failed', function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    return rzp1;
  }
}
