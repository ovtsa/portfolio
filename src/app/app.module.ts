import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { AppRoutingModule } from './app-routing.module';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
