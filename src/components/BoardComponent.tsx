import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import * as buffer from "buffer";
import {nanoid} from "nanoid";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highlightsCells()
  }, [selectedCell])

  function click(cell: Cell) {
    if (selectedCell && selectedCell.id !== cell.id && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      reverseBoard();
    } else {
      if (currentPlayer?.color === cell.figure?.color) {
        setSelectedCell(cell);
      }
      if (cell.isEmpty()) {
        setSelectedCell(null);
      }
    }
  }

  function highlightsCells() {
    board.highlightsCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function reverseBoard() {
    const newBoard = board.getCopyBoard();
    newBoard.reverse();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) =>
          <React.Fragment key={index}>
            {row.map((cell, index) =>
              <CellComponent
                click={click}
                key={nanoid()}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default BoardComponent;