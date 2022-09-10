import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactMeComponent } from "./pages/contact-me/contact-me.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SupportComponent } from "./pages/support/support.component";
import { BlogHomepageComponent } from "./project-pages/blog-homepage/blog-homepage.component";
import { DivvyMapperPageComponent } from "./project-pages/divvy-mapper-page/divvy-mapper-page.component";
import { MinesweeperPageComponent } from "./project-pages/minesweeper-page/minesweeper-page.component";
import { ProjectsLandingPageComponent } from "./project-pages/projects-landing-page/projects-landing-page.component";

const appRoutes: Routes = [
    { path: 'about', component: HomepageComponent},
    { path: 'contact-me', component: ContactMeComponent },
    { path: 'support', component: SupportComponent },
    { path: 'projects', redirectTo: '/projects/blog', pathMatch: 'full'},
    { path: 'projects/blog', component: BlogHomepageComponent },
    { path: 'projects/minesweeper', component: MinesweeperPageComponent },
    { path: 'projects/divvy-bike', component: DivvyMapperPageComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: '**', redirectTo: '/not-found'}
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}