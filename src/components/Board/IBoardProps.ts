import React from "react";
import { PieceSide } from "utils/enums";
import { Piece } from "utils/types";

export interface BoardProps {
  boardResetCounter: number;
  setPlayer: (p: PieceSide) => void;
  boardState: Piece[][];
  setBoardState: React.Dispatch<React.SetStateAction<Piece[][]>>;
}
