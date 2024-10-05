import { PieceSide } from "utils/enums";
import { Piece, Position } from "utils/types";

export interface SquareRendererProps {
  boardState: Piece[][];
  highlightedBlockClickHandler: (row: number, col: number) => void;
  currentTurn: PieceSide;
  pieceClickHandler: (p: Position) => void;
  highlighted: Position[];
  squareIndex: number;
}
