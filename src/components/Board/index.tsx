import { useCallback, useEffect, useState } from "react";
import { BoardProps } from "./IBoardProps";
import {
  enemy,
  sideKing,
  boardSize,
  initialBoardState,
  playerSidePossibleMoves,
} from "utils/constants";
import { PieceSide, PieceState } from "utils/enums";
import {
  getNewBoardStateAfterTheMove,
  hasSomebodyWon,
  isWithinBounds,
} from "utils/helper";
import { Position } from "utils/types";
import ColoredPiece from "components/ColoredPiece";
import GameConclusion from "components/GameConclusion";

const Board: React.FC<BoardProps> = ({
  boardResetCounter,
  setPlayer,
  boardState,
  setBoardState,
}) => {
  const [highlighted, setHighlighted] = useState<Position[]>([]);
  const [currentTurn, setCurrentTurn] = useState(PieceSide.Bottom);
  const [activePiece, setActivePiece] = useState<null | Position>(null);
  const [gameConclusion, setGameConclusion] = useState<null | PieceSide>(null);

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
  }, [setPlayer, setBoardState]);

  // called when user wins and wants to retry
  const retryHandler = () => {
    resetBoard();
    setGameConclusion(null);
  };

  // called when player selects a piece to move
  const pieceClickHandler = (p: Position) => {
    setActivePiece(p);
  };

  // called when player clicks a highlighted block for a possible move
  const highlightedBlockClickHandler = (row: number, col: number) => {
    if (!activePiece) return;
    setBoardState((curBoardState) =>
      getNewBoardStateAfterTheMove(curBoardState, activePiece, row, col)
    );
    setHighlighted([]);
    setActivePiece(null);
    setCurrentTurn(enemy[activePiece.side]);
    setPlayer(enemy[activePiece.side]);
  };

  // detect if bock contains opponent piece
  const isOpponentPiece = useCallback(
    (row: number, col: number): boolean => {
      // [enemy[side], sideKing[enemy[side]]]
      // if (boardState[row][col] === enemy[currentTurn]) return true;
      return [enemy[currentTurn], sideKing[enemy[currentTurn]]].includes(
        boardState[row][col]
      );
    },
    [boardState, currentTurn]
  );

  // method called by useEffect hook when user selects a new piece
  const highlightPossibleMoves = useCallback(
    (p: Position) => {
      if (!p) return;
      const validMoves: Position[] = [];
      if (
        p.pieceValue === PieceState.Empty ||
        p.pieceValue === PieceState.Unusable
      ) {
        return false;
      }
      playerSidePossibleMoves[p.pieceValue].forEach(
        ({ row: rowDir, col: colDir }) => {
          const newRow = p.row + rowDir;
          const newCol = p.col + colDir;
          const jumpRow = newRow + rowDir;
          const jumpCol = newCol + colDir;
          // Ensure move is within bounds and on a valid block
          if (isWithinBounds(newRow, newCol)) {
            if (boardState[newRow][newCol] === PieceState.Empty) {
              validMoves.push({
                row: newRow,
                col: newCol,
                side: p.side,
                pieceValue: boardState[newRow][newCol],
              });
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
                pieceValue: boardState[jumpRow][jumpCol],
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

  useEffect(() => {
    const winner = hasSomebodyWon(boardState);
    if (winner) {
      setGameConclusion(winner);
    }
  }, [boardState]);

  return (
    <div className="w-[50vw] h-[50vw] grid grid-cols-8 grid-rows-8 rounded-md overflow-hidden relative">
      {gameConclusion && (
        <GameConclusion winner={gameConclusion} retryHandler={retryHandler} />
      )}
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
            <ColoredPiece
              key={`${row}${col}`}
              row={row}
              col={col}
              boardState={boardState}
              currentTurn={currentTurn}
              onPieceClick={pieceClickHandler}
              pieceValue={boardState[row][col]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Board;
