import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageSelected: string = 'About';
  title: string = 'portfolio';

  setPageSelected(page: string) {
    this.pageSelected = page;
  }

  onHeaderButtonClicked(headerButtonName: string) {
    this.setPageSelected(headerButtonName);
  }
}
