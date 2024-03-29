import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  faLinkedin,
  faGithub,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
  faHeart,
  faEye,
  faShare,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { FaqTypeDirective } from './directives/faq-type.directive';
import { LoaderComponent } from './loader/loader.component';
import { EventGalleryComponent } from './event-gallery/event-gallery.component';
import { LoginComponent } from './login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PaymentCheckoutComponent } from './payment-checkout/payment-checkout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { EventRegisterComponent } from './event-register/event-register.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    OurTeamComponent,
    HeaderComponent,
    FooterComponent,
    ContactUsComponent,
    AboutUsComponent,
    FaqComponent,
    EventDetailsComponent,
    FaqTypeDirective,
    LoaderComponent,
    EventGalleryComponent,
    LoginComponent,
    GalleryComponent,
    PaymentCheckoutComponent,
    TermConditionComponent,
    PrivacyPolicyComponent,
    EventRegisterComponent,
    RefundPolicyComponent,
    RegisterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    FontAwesomeModule,
    NgbModule,
    NgbAccordionModule,
    MatSliderModule,
    AppRoutingModule,
    SocialLoginModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '378721913451-bbbjji82oce2a2rsm4ndtil68oa2f712.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faLinkedin,
      faInstagram,
      faGithub,
      faTwitter,
      faHeart,
      faEye,
      faShare,
      faCheck
    );
  }
}
