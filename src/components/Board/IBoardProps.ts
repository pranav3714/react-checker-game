import React from "react";
import { PieceSide } from "utils/enums";
import { Piece, Position } from "utils/types";

export interface BoardProps {
  resetBoard: () => void;
  boardState: Piece[][];
  setBoardState: React.Dispatch<React.SetStateAction<Piece[][]>>;
  highlighted: Position[];
  currentTurn: PieceSide;
  activePiece: Position | null;
  gameConclusion: PieceSide | null;
  setActivePiece: React.Dispatch<React.SetStateAction<Position | null>>;
  setHighlighted: React.Dispatch<React.SetStateAction<Position[]>>;
  setCurrentTurn: React.Dispatch<React.SetStateAction<PieceSide>>;
  setGameConclusion: React.Dispatch<React.SetStateAction<PieceSide | null>>;
}
