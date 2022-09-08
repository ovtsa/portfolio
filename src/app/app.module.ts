import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectsNavbarComponent } from './projects-navbar/projects-navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HeaderButtonComponent } from './header/header-button/header-button.component';
import { ContactMeComponent } from './pages/contact-me/contact-me.component';
import { SupportComponent } from './pages/support/support.component';
import { ContactFormComponent } from './shared/components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: HomepageComponent},
  { path: 'contact-me', component: ContactMeComponent },
  { path: 'support', component: SupportComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectsNavbarComponent,
    HomepageComponent,
    HeaderButtonComponent,
    ContactMeComponent,
    SupportComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
