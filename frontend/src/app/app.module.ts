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
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { HttpDriver } from './shared/http-driver.service';
import { NavbarButtonComponent } from './projects-navbar/navbar-button/navbar-button.component';
import { BlogHomepageComponent } from './project-pages/blog-homepage/blog-homepage.component';
import { ProjectsLandingPageComponent } from './project-pages/projects-landing-page/projects-landing-page.component';
import { MinesweeperPageComponent } from './project-pages/minesweeper-page/minesweeper-page.component';
import { DivvyMapperPageComponent } from './project-pages/divvy-mapper-page/divvy-mapper-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MinesweeperBoardComponent } from './project-pages/minesweeper-page/minesweeper-board/minesweeper-board.component';

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
    ContactFormComponent,
    NavbarButtonComponent,
    BlogHomepageComponent,
    ProjectsLandingPageComponent,
    MinesweeperPageComponent,
    DivvyMapperPageComponent,
    MinesweeperBoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, HttpDriver],
  bootstrap: [AppComponent]
})
export class AppModule { }
