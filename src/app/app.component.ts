import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ContactMeComponent } from './pages/contact-me/contact-me.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SupportComponent } from './pages/support/support.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: HomepageComponent},
  { path: 'contact-me', component: ContactMeComponent },
  { path: 'support', component: SupportComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'portfolio';
}
