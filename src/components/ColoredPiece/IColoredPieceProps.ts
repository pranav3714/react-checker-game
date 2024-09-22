import { ChipSide } from "utils/enums";
import { Piece, Position } from "utils/types";

export interface ColoredChipProps {
  isKing: boolean;
  side: ChipSide;
  currentTurn: ChipSide;
  row: number;
  col: number;
  boardState: Piece[][];
  onPieceClick: (p: Position) => void;
}
