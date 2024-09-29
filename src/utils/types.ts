import { PieceSide, PieceState } from "./enums";

export type Position = {
  row: number;
  col: number;
  side: PieceSide;
  pieceValue: PieceState
};

export type Piece = 0 | 1 | 2 | 3 | 4 | -1;
