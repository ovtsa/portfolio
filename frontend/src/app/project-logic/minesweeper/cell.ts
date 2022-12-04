export enum CellState {
    UNKNOWN,
    CLEAR,
    FLAG
}

enum CellImage {
    ZERO  = "assets/images/minesweeper/cell-0.png",
    ONE   = "assets/images/minesweeper/cell-1.png",
    TWO   = "assets/images/minesweeper/cell-2.png",
    THREE = "assets/images/minesweeper/cell-3.png",
    FOUR  = "assets/images/minesweeper/cell-4.png",
    FIVE  = "assets/images/minesweeper/cell-5.png",
    SIX   = "assets/images/minesweeper/cell-6.png",
    SEVEN = "assets/images/minesweeper/cell-7.png",
    EIGHT = "assets/images/minesweeper/cell-8.png",

    UNKNOWN       = "assets/images/minesweeper/cell-unknown.png",
    FLAGGED       = "assets/images/minesweeper/cell-flagged.png",
    FLAGGED_WRONG = "assets/images/minesweeper/cell-flagged-wrong.png",
    MINE          = "assets/images/minesweeper/cell-mine.png",
    MINE_DEATH    = "assets/images/minesweeper/cell-mine-death.png",

    ERROR = "assets/images/minesweeper/cell-error.png"
}

export class Cell {
    cellState: CellState = CellState.UNKNOWN;
    mine: boolean = false; 
    deathClick: boolean = false;
    clicking: boolean = false;
    numAdjacentMines: number = 0;

    constructor(public row: number, public col: number) {}

    getCellImage(gameOver: boolean, gameWon: boolean): string {

        // If a cell is cleared, there's a mine underneath, and this was the click that ended the game,
        // the mine death icon should be used.
        if (this.mine && this.deathClick) {
            return CellImage.MINE_DEATH;
        }

        // If a cell is flagged and the game is not over, it should have a flagged icon.
        // If a cell is flagged and the game is over, it should keep the flagged icon
        // if the cell had a mine underneath.
        if (
            (this.cellState == CellState.FLAG && !gameOver) ||
            (this.cellState == CellState.FLAG && gameOver && this.mine)
        ) {
            return CellImage.FLAGGED;
        }

        // If a cell is flagged, the game is over, and there is not a mine underneath,
        // it should display the incorrectly flagged icon.
        if (this.cellState == CellState.FLAG && gameOver && !this.mine) {
            return CellImage.FLAGGED_WRONG;
        }

        // If the game is over and lost, and a cell has a mine, it should be shown
        if (gameOver && !gameWon && this.mine) {
            return CellImage.MINE;
        }

        // If the game is over and won, and a cell has a mine, it should be flagged
        if (gameOver && gameWon && this.mine) {
            return CellImage.FLAGGED;
        }

        // If a square has been cleared, its image should depend on the number of adjacent mines.
        if (this.cellState == CellState.CLEAR) {
            switch (this.numAdjacentMines) {
                case 0:
                    return CellImage.ZERO;
                case 1:
                    return CellImage.ONE;
                case 2:
                    return CellImage.TWO;
                case 3:
                    return CellImage.THREE;
                case 4:
                    return CellImage.FOUR;
                case 5:
                    return CellImage.FIVE;
                case 6:
                    return CellImage.SIX;
                case 7:
                    return CellImage.SEVEN;
                case 8:
                    return CellImage.EIGHT;
            }
        }

        // If a cell is currently being clicked, it should show the empty grid image
        if (this.clicking) {
            return CellImage.ZERO;
        }

        // Whether the game is over or not, other unknown squares need not be revealed
        if (this.cellState == CellState.UNKNOWN) {
            return CellImage.UNKNOWN;
        }

        // One of these conditions should have been met. This should not be returned. If it is, there
        // is an error in the above logic.
        return CellImage.ERROR;
    }
}