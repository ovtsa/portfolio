import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { routeFade } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeFade
  ]
})
export class AppComponent {
  title: string = 'portfolio';
  routeState: string = 'loaded'; // loaded, unloaded
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
