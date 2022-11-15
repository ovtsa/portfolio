import { CellState, Cell } from './cell';

// first num in internal array is y-offset, second is x-offset (from current cell)
const surroundingCells = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export enum DefaultBoardSpecs {
    BeginnerWidth=8,
    BeginnerHeight=8,
    BeginnerNumMines=10,

    IntermediateWidth=16,
    IntermediateHeight=16,
    IntermediateNumMines=40,

    ExpertWidth=30,
    ExpertHeight=16,
    ExpertNumMines=99
}

export class Board {
    // A board is a grid of cells
    // Initialize a grid of width x and height y of cells
    // While doing this, set cell.cellState to CellState.OPEN
    // randomly decide where to place mines and assign mines depending on that decision (helper function for sure)
    // do cell.mine = true for these cells
    // finally, fill in the number of mines in surrounding cells (100% a helper function)
    // 
    // UI setup of this board can happen in another angular component outside this directory. This is just logic
    grid: Cell[][] = [];

    constructor(public width: number, public height: number, public numMines: number) {
        for (let y = 0; y < height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < width; x++) {
                this.grid[y][x] = new Cell(y, x);
            }
        }
        this.assignMines();
        this.countAdjacentMines();
    }

    // This function ensures the first cell clicked isn't a mine. If it is, it moves that mine somewhere else,
    // and then recounts the adjacent mines in each cell.
    public moveMineFromCell(x: number, y: number): boolean {
        if (!this.grid[y][x].mine) return false;

        // this finds a random other cell that is not a mine 
        let newCell: Cell = this.getRandomCell();
        while (newCell.mine) {
            newCell = this.getRandomCell();
        }

        this.grid[y][x].mine = false;
        newCell.mine = true;
        this.countAdjacentMines();
        return true;
    }

    // This function takes forever if the board is almost full of mines, but since we will only allow a few configurations,
    // none so full, this should not be a problem.
    private assignMines(): void {
        let placed = 0;
        while (placed < this.numMines) {
            let cell = this.getRandomCell();
            if (!cell.mine) {
                cell.mine = true;
                placed++;
            }
        }
    }

    private countAdjacentMines(): void {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let adjacentMines = 0;
                for (const neighbor of surroundingCells) {
                    if (
                        this.grid[y + neighbor[1]] &&
                        this.grid[y + neighbor[1]][x + neighbor[0]] &&
                        this.grid[y + neighbor[1]][x + neighbor[0]].mine
                    ) {
                        adjacentMines++;
                    }
                }
                this.grid[y][x].numAdjacentMines = adjacentMines;
            }
        }
    }

    private getRandomCell(): Cell {
        let x = Math.floor(Math.random() * this.width);
        let y = Math.floor(Math.random() * this.height);
        return this.grid[y][x];
    }
}