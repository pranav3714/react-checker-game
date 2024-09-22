import { boardSize } from "./constants";

export const isWithinBounds = (row: number, col: number): boolean => {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
};
