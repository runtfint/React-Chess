import React, { FC, FunctionComponent, useEffect, useState } from "react";
import { Board } from "../models/Board"
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    
    const click = (cell: Cell) => {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)  
            setSelectedCell(null)
        }
        else {
            setSelectedCell(cell)
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
    )
}

export default BoardComponent
