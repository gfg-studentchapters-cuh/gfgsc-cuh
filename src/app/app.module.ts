import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';

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
  ],
  imports: [BrowserModule, NgbAccordionModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
