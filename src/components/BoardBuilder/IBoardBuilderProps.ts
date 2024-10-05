import { PieceSide } from "utils/enums";
import { Piece, Position } from "utils/types";

export interface BoardBuilderProps {
  highlighted: Position[];
  highlightedBlockClickHandler: (row: number, col: number) => void;
  boardState: Piece[][];
  currentTurn: PieceSide;
  pieceClickHandler: (p: Position) => void;
}
