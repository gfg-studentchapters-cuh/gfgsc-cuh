import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventRegisterComponent } from './event-register/event-register.component';
import { EventsComponent } from './events/events.component';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaymentCheckoutComponent } from './payment-checkout/payment-checkout.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { RegisterComponent } from './register/register.component';
import { TermConditionComponent } from './term-condition/term-condition.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'events',
    component: EventsComponent,
  },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'our-team', component: OurTeamComponent },
  { path: 'about-us', component: AboutUsComponent },
  // { path: 'faq', component: FaqComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'term-condition', component: TermConditionComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  // { path: 'checkout/:id', component: PaymentCheckoutComponent },
  { path: 'event-register/:id', component: EventRegisterComponent },
  { path: 'refund-policy', component: RefundPolicyComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
