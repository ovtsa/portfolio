import { Component, OnInit } from '@angular/core';
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
  firstClick: boolean;
  lastMouseDownPosition: {x: number, y: number};

  constructor() { 
    this.reset();
  }

  ngOnInit(): void {
  }

  reset(): void {
    this.board = new Board(DefaultBoardSpecs.ExpertWidth, DefaultBoardSpecs.ExpertHeight, DefaultBoardSpecs.ExpertNumMines);
    this.gameOver = false;
    this.firstClick = true;
    this.lastMouseDownPosition = {x: -1, y: -1};
  }

  mouseUpOnCell(x: number, y: number, skipAll?: boolean, skipMousePositionCheck?: boolean): void {
    // if the game is over already
    if (this.gameOver) return;
    // if skipping, it means you dragged out of bounds. Undo the cell pressing animation and reset the last cell pressed data
    if (skipAll) {
      console.log('mouseUpOnCell() skip all');
      if (this.lastMouseDownPosition.x >= 0 && this.lastMouseDownPosition.y >= 0)
        this.board.grid[this.lastMouseDownPosition.y][this.lastMouseDownPosition.x].clicking = false;
      return;
    }
    // bounds checking that you aren't selecting outside the grid
    if (x < 0 || x >= this.board.width || y < 0 || y >= this.board.height) return;
    // ensuring this is the cell that was originally pressed 
    if (!skipMousePositionCheck && (this.lastMouseDownPosition.x != x || this.lastMouseDownPosition.y != y)) {
      console.log('skip mouse position check false');
      if (this.lastMouseDownPosition.x >= 0 && this.lastMouseDownPosition.y >= 0) {
        this.board.grid[this.lastMouseDownPosition.y][this.lastMouseDownPosition.x].clicking = false;
      }
      return;
    }
    // ensuring you don't click an empty or flagged cell
    if (this.board.grid[y][x].cellState != CellState.UNKNOWN) return;

    if (this.firstClick && this.board.grid[y][x].mine) {
      this.board.moveMineFromCell(x, y);
      console.log('first click had to move mine from (' + x + ', ' + y + ')');
    }

    console.log('grid square (' + x + ', ' + y + ') clicked');
    this.firstClick = false;
    this.board.grid[this.lastMouseDownPosition.y][this.lastMouseDownPosition.x].clicking = false;

    if (this.board.grid[y][x].mine) {
      this.gameOver = true;
      this.board.grid[y][x].deathClick = true;
    } else {
      this.board.grid[y][x].cellState = CellState.CLEAR;
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
    }
  }

  public test() {
    console.log('hi');
  }

  flagCell(x: number, y: number): void {
    console.log('flagCell()');
    if (this.gameOver) return;
    if (x < 0 || x >= this.board.width || y < 0 || y >= this.board.height) return;
    if (this.board.grid[y][x].cellState == CellState.CLEAR) return;

    let cell = this.board.grid[y][x];

    if (cell.cellState == CellState.UNKNOWN) {
      cell.cellState = CellState.FLAG;
    } else {
      cell.cellState = CellState.UNKNOWN;
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

    this.lastMouseDownPosition.x = x;
    this.lastMouseDownPosition.y = y;
    this.board.grid[y][x].clicking = true;

    console.log('mouseDownOnCell() on (' + x + ', ' + y + ')')
  }
}