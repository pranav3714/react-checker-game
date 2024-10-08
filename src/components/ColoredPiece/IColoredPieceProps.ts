import { PieceSide, PieceState } from "utils/enums";
import { Piece, Position } from "utils/types";

export interface ColoredChipProps {
  currentTurn: PieceSide;
  row: number;
  col: number;
  boardState: Piece[][];
  onPieceClick: (p: Position) => void;
  pieceValue: PieceState;
}
