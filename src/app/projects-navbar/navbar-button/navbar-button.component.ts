import { Component, Input, OnInit } from '@angular/core';
import { navButtonAnimation } from './navbar-button-animation';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrls: ['./navbar-button.component.css'],
  animations: [
    navButtonAnimation
  ]
})
export class NavbarButtonComponent implements OnInit {
  @Input() buttonText: string;
  buttonSelectionStatus: string = "deselected";

  constructor() { }

  ngOnInit(): void {
  }

  toggleButton(): string {
    this.buttonSelectionStatus = this.buttonSelectionStatus === 'deselected' ? 'selected' : 'deselected';
    console.log(this.buttonText + ' ' + this.buttonSelectionStatus);
    return this.buttonSelectionStatus;
  }

  getButtonSelectionStatus(): string {
    return this.buttonSelectionStatus;
  }
}
