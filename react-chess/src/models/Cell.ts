import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random()
    }

    isEmptyVertical(target: Cell){

    }

    isEmptyHorizontal(target: Cell){

    }

    isEmptyDiagonal(target: Cell){

    }

    moveFigure(target: Cell){
        if(this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure(target)
            target.figure = this.figure
            this.figure = null  
        }
    }
}