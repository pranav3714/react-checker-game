import { PieceSide } from "utils/enums";
import { Piece, Position } from "utils/types";

export interface ColoredChipProps {
  isKing: boolean;
  side: PieceSide;
  currentTurn: PieceSide;
  row: number;
  col: number;
  boardState: Piece[][];
  onPieceClick: (p: Position) => void;
}
