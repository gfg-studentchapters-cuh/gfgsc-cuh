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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule,
    FontAwesomeModule,
    NgbModule,
    NgbAccordionModule,
    MatSliderModule,
    AppRoutingModule,
  ],
  providers: [],
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
