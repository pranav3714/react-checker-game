import { PieceSide } from "utils/enums";

export interface BoardProps {
  boardResetCounter: number;
  setPlayer: (p: PieceSide) => void;
}
