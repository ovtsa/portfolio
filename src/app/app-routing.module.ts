import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactMeComponent } from "./pages/contact-me/contact-me.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SupportComponent } from "./pages/support/support.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'about', component: HomepageComponent},
    { path: 'contact-me', component: ContactMeComponent },
    { path: 'support', component: SupportComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found'}
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}