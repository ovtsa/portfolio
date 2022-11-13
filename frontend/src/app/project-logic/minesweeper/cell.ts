export enum CellState {
    OPEN,
    CLEAR,
    MINE,
    FLAG
}

export class Cell {
    cellState: CellState = CellState.OPEN;
    mine: boolean = false; 
    numAdjacentMines: number = 0;

    constructor(public row: number, public col: number) {}
}