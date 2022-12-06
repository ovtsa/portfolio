import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { Board, DefaultBoardSpecs } from 'src/app/project-logic/minesweeper/board';
import { CellState } from 'src/app/project-logic/minesweeper/cell';

@Component({
  selector: 'app-minesweeper-board',
  templateUrl: './minesweeper-board.component.html',
  styleUrls: ['./minesweeper-board.component.css']
})
export class MinesweeperBoardComponent implements OnInit {
  board: Board;
  gameOver: boolean;
  gameWon: boolean;
  firstClick: boolean;
  lastMouseDownPosition: {x: number, y: number};
  gameButtonImageSrc: string;
  previousGameButtonImage: string;
  pressingGameButton: boolean;
  uiTimer: number;
  actualTimer: number;
  uiMineCounter: number;
  actualMineCounter: number;
  intervalId: number;
  
  constructor() { 
    this.reset();
  }

  ngOnInit(): void {
    this.reset();
   }

  reset(): void {
    this.stopTimer();
    this.board = new Board(DefaultBoardSpecs.ExpertWidth, DefaultBoardSpecs.ExpertHeight, DefaultBoardSpecs.ExpertNumMines);
    this.gameOver = false;
    this.gameWon = false;
    this.firstClick = true;
    this.lastMouseDownPosition = {x: -1, y: -1};
    this.gameButtonImageSrc = "assets/images/minesweeper/game-button.png";
    this.previousGameButtonImage = "";
    this.pressingGameButton = false;
    this.uiTimer = 0;
    this.actualTimer = 0;
    this.uiMineCounter = 0;
    this.actualMineCounter = 0;
    this.intervalId = -1;
  }

  setTimer() {
    // somehow this method gets called a billion times ???
    this.intervalId = window.setInterval(() => {
      this.actualTimer++;
      if (this.actualTimer < 1000) this.uiTimer++;
    }, 1000);
    console.log("MinesweeperBoardComponent.setTimer()  intervalId: " + this.intervalId);
  }

  stopTimer() {
    console.log("MinesweeperBoardComponent.stopTimer() intervalId: " + this.intervalId);
    window.clearInterval(this.intervalId);
  }

  gameButtonPressed() {
    this.pressingGameButton = true;
    this.previousGameButtonImage = this.gameButtonImageSrc;
    this.gameButtonImageSrc = "assets/images/minesweeper/game-button-clicking.png";
  }

  gameButtonReleased() {
    if (this.pressingGameButton) {
      this.reset();
    }
  }

  cancelGameButtonClick() {
    if (this.pressingGameButton) {
      this.pressingGameButton = false;
      this.gameButtonImageSrc = this.previousGameButtonImage;
      this.previousGameButtonImage = "";
    }
  }

  mouseUpOnCell(x: number, y: number, skipAll?: boolean, skipMousePositionCheck?: boolean): void {
    // if the game is over already
    if (this.gameOver) return;
    // if skipping, it means you dragged out of bounds. Undo the cell pressing animation and reset the last cell pressed data
    if (skipAll) {
      if (this.lastMouseDownPosition.x >= 0 && this.lastMouseDownPosition.y >= 0)
        this.board.grid[this.lastMouseDownPosition.y][this.lastMouseDownPosition.x].clicking = false;
      this.gameButtonImageSrc = "assets/images/minesweeper/game-button.png";
      return;
    }
    // bounds checking that you aren't selecting outside the grid
    if (x < 0 || x >= this.board.width || y < 0 || y >= this.board.height) return;
    // ensuring this is the cell that was originally pressed 
    if (!skipMousePositionCheck && (this.lastMouseDownPosition.x != x || this.lastMouseDownPosition.y != y)) {
      if (this.lastMouseDownPosition.x >= 0 && this.lastMouseDownPosition.y >= 0) {
        this.board.grid[this.lastMouseDownPosition.y][this.lastMouseDownPosition.x].clicking = false;
        this.gameButtonImageSrc = "assets/images/minesweeper/game-button.png";
      }
      return;
    }
    // ensuring you don't click an empty or flagged cell
    if (this.board.grid[y][x].cellState != CellState.UNKNOWN) return;

    if (this.firstClick && this.board.grid[y][x].mine) {
      this.board.moveMineFromCell(x, y);
    }

    if (this.firstClick) this.firstClickFunc(x, y);
    this.firstClick = false;

    this.board.grid[this.lastMouseDownPosition.y][this.lastMouseDownPosition.x].clicking = false;

    if (this.board.grid[y][x].mine) {
      this.stopTimer();
      this.gameOver = true;
      this.board.grid[y][x].deathClick = true;
      this.gameButtonImageSrc = "assets/images/minesweeper/game-button-dead.png";
    } else {
      this.board.grid[y][x].cellState = CellState.CLEAR;
      this.gameButtonImageSrc = "assets/images/minesweeper/game-button.png";
      if (this.board.grid[y][x].numAdjacentMines == 0) {
        this.mouseUpOnCell(x - 1, y - 1, false, true);
        this.mouseUpOnCell(x - 1, y, false, true);
        this.mouseUpOnCell(x - 1, y + 1, false, true);
        this.mouseUpOnCell(x, y - 1, false, true);
        this.mouseUpOnCell(x, y + 1, false, true);
        this.mouseUpOnCell(x + 1, y - 1, false, true);
        this.mouseUpOnCell(x + 1, y, false, true);
        this.mouseUpOnCell(x + 1, y + 1, false, true);
      }
      if (this.board.isGameWon()) { 
        this.stopTimer();
        this.gameOver = true; 
        this.gameWon = true;
        this.gameButtonImageSrc = "assets/images/minesweeper/game-button-victory.png";
      }
    }
  }

  flagCell(x: number, y: number): void {
    if (this.gameOver || this.firstClick) return;
    if (x < 0 || x >= this.board.width || y < 0 || y >= this.board.height) return;
    if (this.board.grid[y][x].cellState == CellState.CLEAR) return;

    let cell = this.board.grid[y][x];

    if (cell.cellState == CellState.UNKNOWN) {
      cell.cellState = CellState.FLAG;
      this.actualMineCounter--;
      if (this.actualMineCounter < 1000 && this.actualMineCounter >= 0) this.uiMineCounter = this.actualMineCounter;
    } else {
      cell.cellState = CellState.UNKNOWN;
      this.actualMineCounter++;
      if (this.actualMineCounter < 1000 && this.actualMineCounter >= 0) this.uiMineCounter = this.actualMineCounter;
    }
  }

  // This makes sure users can back out of a click they don't want to do
  mouseDownOnCell(event: MouseEvent, x: number, y: number): void {
    if (this.gameOver) return;
    if (event.button === 2) {
      this.flagCell(x, y);
      return;
    }
    if (x < 0 || x >= this.board.width || y < 0 || y >= this.board.height) return;
    if (this.board.grid[y][x].cellState != CellState.UNKNOWN) return;
    this.gameButtonImageSrc = "assets/images/minesweeper/game-button-clicking.png";

    this.lastMouseDownPosition.x = x;
    this.lastMouseDownPosition.y = y;
    this.board.grid[y][x].clicking = true;
  }

  private firstClickFunc(x: number, y: number): void {
    this.uiMineCounter = this.board.numMines;
    this.actualMineCounter = this.board.numMines;
    this.setTimer();
  }
}
