import { Component, Input, OnInit, OnChanges, SimpleChanges, Injectable } from '@angular/core';

@Component({
  selector: 'app-minesweeper-ui-num-field',
  templateUrl: './minesweeper-ui-num-field.component.html',
  styleUrls: ['./minesweeper-ui-num-field.component.css']
})
export class MinesweeperUiNumFieldComponent implements OnInit, OnChanges {
  private readonly numImages: string[] = [
    "assets/images/minesweeper/counter-0.png",
    "assets/images/minesweeper/counter-1.png",
    "assets/images/minesweeper/counter-2.png",
    "assets/images/minesweeper/counter-3.png",
    "assets/images/minesweeper/counter-4.png",
    "assets/images/minesweeper/counter-5.png",
    "assets/images/minesweeper/counter-6.png",
    "assets/images/minesweeper/counter-7.png",
    "assets/images/minesweeper/counter-8.png",
    "assets/images/minesweeper/counter-9.png"
  ];
  hundreds: string;
  tens: string;
  ones: string;
  @Input() value: number;

  constructor() { }

  ngOnInit(): void {
    this.hundreds = this.numImages[0];
    this.tens = this.numImages[0];
    this.ones = this.numImages[0];
    this.value = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setNumber(changes.value.currentValue);
  }

  setNumber(num: number): void {
    let numAsString: string = num.toString().padStart(3, '0');
    this.value = num;
    this.hundreds = this.numImages[numAsString.charAt(0)];
    this.tens = this.numImages[numAsString.charAt(1)];
    this.ones = this.numImages[numAsString.charAt(2)];
  }
}
