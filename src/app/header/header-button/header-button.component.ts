import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.css']
})
export class HeaderButtonComponent implements OnInit {
  @Input() buttonText = 'button';
  @Output() headerButtonClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClicked() {
    this.headerButtonClicked.emit(this.buttonText);
  }
}
