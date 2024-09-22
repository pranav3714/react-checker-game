import { useCallback, useEffect, useState } from "react";
import { BoardProps } from "./IBoardProps";
import {
  enemy,
  boardSize,
  initialBoardState,
  playerSidePossibleMoves,
  showPositionForEachBlock,
} from "utils/constants";
import { PieceSide, PieceState } from "utils/enums";
import { isWithinBounds } from "utils/helper";
import { Position } from "utils/types";
import ColoredPiece from "components/ColoredPiece";

const Board: React.FC<BoardProps> = ({ boardResetCounter, setPlayer }) => {
  const [boardState, setBoardState] = useState(initialBoardState);
  const [highlighted, setHighlighted] = useState<Position[]>([]);
  const [currentTurn, setCurrentTurn] = useState(PieceSide.Bottom);
  const [activePiece, setActivePiece] = useState<null | Position>(null);

  // deciding factor for rendering block color
  const isDarkSquare = (row: number, col: number) => {
    return (row + col) % 2 === 1;
  };

  // call this function to reset the board
  const resetBoard = useCallback(() => {
    setBoardState(initialBoardState);
    setHighlighted([]);
    setActivePiece(null);
    setCurrentTurn(PieceSide.Bottom);
    setPlayer(PieceSide.Bottom);
  }, [setPlayer]);

  // called when player selects a piece to move
  const pieceClickHandler = (p: Position) => {
    setActivePiece(p);
  };

  // called when player clicks a highlighted block for a possible move
  const highlightedBlockClickHandler = (row: number, col: number) => {
    if (!activePiece) return;
    setBoardState((curBoardState) => {
      const hardCopy = curBoardState.map((fullRow) => [...fullRow]);
      hardCopy[row][col] = activePiece.side;
      hardCopy[activePiece.row][activePiece.col] = PieceState.Empty;

      // diff between previous piece state and the latest piece state
      const rowDiff = row - activePiece.row;
      const colDiff = col - activePiece.col;
      // Check if the move was a jump (capture)
      if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
        // Calculate the position of the opponent piece
        const jumpedRow = activePiece.row + rowDiff / 2;
        const jumpedCol = activePiece.col + colDiff / 2;
        // Set the opponent piece to empty
        hardCopy[jumpedRow][jumpedCol] = PieceState.Empty;
      }
      return hardCopy;
    });
    setHighlighted([]);
    setActivePiece(null);
    setCurrentTurn(enemy[activePiece.side]);
    setPlayer(enemy[activePiece.side]);
  };

  // detect if bock contains opponent piece
  const isOpponentPiece = useCallback(
    (row: number, col: number): boolean => {
      if (boardState[row][col] === enemy[currentTurn]) return true;
      return false;
    },
    [boardState, currentTurn]
  );

  // method called by useEffect hook when user selects a new piece
  const highlightPossibleMoves = useCallback(
    (p: Position) => {
      if (!p) return;
      const validMoves: Position[] = [];
      playerSidePossibleMoves[p.side].forEach(
        ({ row: rowDir, col: colDir }) => {
          const newRow = p.row + rowDir;
          const newCol = p.col + colDir;
          const jumpRow = newRow + rowDir;
          const jumpCol = newCol + colDir;
          // Ensure move is within bounds and on a valid block
          if (isWithinBounds(newRow, newCol)) {
            if (boardState[newRow][newCol] === PieceState.Empty) {
              validMoves.push({ row: newRow, col: newCol, side: p.side });
            }
            if (
              isWithinBounds(jumpRow, jumpCol) &&
              isOpponentPiece(newRow, newCol) &&
              boardState[jumpRow][jumpCol] === PieceState.Empty
            ) {
              validMoves.push({
                row: jumpRow,
                col: jumpCol,
                side: p.side,
              });
            }
          }
        }
      );
      setHighlighted(validMoves);
    },
    [boardState, isOpponentPiece]
  );

  useEffect(() => {
    if (activePiece === null) return;
    // get all possible move positions and push to highlighted state using the activePiece state variable
    highlightPossibleMoves(activePiece);
  }, [activePiece, highlightPossibleMoves]);

  useEffect(() => {
    resetBoard();
  }, [boardResetCounter, resetBoard]);

  return (
    <>
      {Array.from({ length: boardSize * boardSize }, (_, i) => {
        const row = Math.floor(i / boardSize);
        const col = i % boardSize;
        const squareColor = isDarkSquare(row, col)
          ? "bg-yellow-900"
          : "bg-yellow-600";
        const isHighlighted = highlighted.some(
          (pos) => pos.row === row && pos.col === col
        );

        return (
          <div
            key={`${row}-${col}`}
            className={`${squareColor} w-full h-full flex justify-center items-center relative p-3`}
          >
            {isHighlighted && (
              <div
                className="absolute w-full h-full border border-white cursor-pointer"
                onClick={() => highlightedBlockClickHandler(row, col)}
              />
            )}
            {[PieceState.TopPlayerPiece, PieceState.TopPlayerKing].includes(
              boardState[row][col]
            ) ? (
              <ColoredPiece
                isKing={boardState[row][col] === PieceState.TopPlayerKing}
                side={PieceSide.Top}
                key={`${row}${col}`}
                {...{
                  row,
                  col,
                  boardState,
                  onPieceClick: pieceClickHandler,
                  currentTurn,
                }}
              />
            ) : [
                PieceState.BottomPlayerPiece,
                PieceState.BottomPlayerKing,
              ].includes(boardState[row][col]) ? (
              <ColoredPiece
                isKing={boardState[row][col] === PieceState.BottomPlayerKing}
                side={PieceSide.Bottom}
                key={`${row}${col}`}
                {...{
                  row,
                  col,
                  boardState,
                  onPieceClick: pieceClickHandler,
                  currentTurn,
                }}
              />
            ) : showPositionForEachBlock ? (
              `${row}-${col}`
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default Board;
