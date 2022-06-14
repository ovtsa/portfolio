import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectsNavbarComponent } from './projects-navbar/projects-navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HeaderButtonComponent } from './header/header-button/header-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectsNavbarComponent,
    HomepageComponent,
    HeaderButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
