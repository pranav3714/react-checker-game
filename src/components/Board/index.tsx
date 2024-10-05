import { useCallback, useEffect } from "react";
import { BoardProps } from "./IBoardProps";
import { enemy } from "utils/constants";
import { hasSomebodyWon } from "utils/helper";
import { Position } from "utils/types";
import GameConclusion from "components/GameConclusion";
import BoardBuilder from "components/BoardBuilder";
import boardManagerInst from "classes/BoardManager";

const Board: React.FC<BoardProps> = ({
  resetBoard,
  boardState,
  setBoardState,
  activePiece,
  currentTurn,
  gameConclusion,
  highlighted,
  setActivePiece,
  setCurrentTurn,
  setHighlighted,
  setGameConclusion,
}) => {
  // called when player selects a piece to move
  const pieceClickHandler = (p: Position) => {
    setActivePiece(p);
  };

  // called when player clicks a highlighted block for a possible move
  const highlightedBlockClickHandler = (
    rowToMove: number,
    colToMove: number
  ) => {
    if (!activePiece) return;
    setBoardState(() => {
      const newBoardStateAfterTheMove =
        boardManagerInst.updateBoardStateAfterTheMove(
          activePiece,
          rowToMove,
          colToMove
        );
      return newBoardStateAfterTheMove;
    });
    setHighlighted([]);
    setActivePiece(null);
    setCurrentTurn(enemy[activePiece.side]);
  };

  // method called by useEffect hook when user selects a new piece
  const highlightPossibleMoves = useCallback(
    (p: Position) => {
      if (!p) return;
      const highlighted = boardManagerInst.getPossibleMoves(
        p.row,
        p.col,
        p.pieceValue,
        currentTurn
      );
      setHighlighted(highlighted);
    },
    [currentTurn, setHighlighted]
  );

  useEffect(() => {
    if (activePiece === null) return;
    // get all possible move positions and push to highlighted state using the activePiece state variable
    highlightPossibleMoves(activePiece);
  }, [activePiece, highlightPossibleMoves]);

  useEffect(() => {
    // tracks every change in boardState
    // is triggered when a player looses all his pieces in the game
    const winner = hasSomebodyWon(boardState);
    if (winner) {
      setGameConclusion(winner);
    }
  }, [boardState, setGameConclusion]);

  return (
    <div className="w-[50vw] h-[50vw] grid grid-cols-8 grid-rows-8 rounded-md overflow-hidden relative">
      {gameConclusion && (
        <GameConclusion winner={gameConclusion} retryHandler={resetBoard} />
      )}
      <BoardBuilder
        boardState={boardState}
        currentTurn={currentTurn}
        highlighted={highlighted}
        highlightedBlockClickHandler={highlightedBlockClickHandler}
        pieceClickHandler={pieceClickHandler}
      />
    </div>
  );
};

export default Board;
