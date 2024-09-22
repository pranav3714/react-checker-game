import { ChipSide } from "./enums";

export type Position = {
  row: number;
  col: number;
  side: ChipSide;
};

export type Piece = 0 | 1 | 2 | 3 | 4 | -1;
