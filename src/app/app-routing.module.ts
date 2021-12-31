import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsComponent } from './events/events.component';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { OurTeamComponent } from './our-team/our-team.component';

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
  { path: 'faq', component: FaqComponent },
  { path: 'contact-us', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
