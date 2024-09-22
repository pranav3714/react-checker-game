import { ChipSide } from "utils/enums";

export interface BoardProps {
  boardResetCounter: number;
  setPlayer: (p: ChipSide) => void;
}
