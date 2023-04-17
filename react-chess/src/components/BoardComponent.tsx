import React, { FC, FunctionComponent, useEffect, useState } from "react";
import { Board } from "../models/Board"
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    
    const click = (cell: Cell) => {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
            updateBoard()
        }
        else {
            if(cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell) 
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    const highlightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h4>текущий игрок: {currentPlayer?.color === Colors.WHITE ? "белый " : "чёрный"}</h4>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                            click={click}
                            cell={cell}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y }
                            key={cell.id}
                            />
                            )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default BoardComponent
