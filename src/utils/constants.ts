import { PieceSide } from "./enums";
import { Piece } from "./types";

const initialBoardState: Piece[][] = [
    [-1, 2, -1, 2, -1, 2, -1, 2], // Row 0 (Player 2)
    [2, -1, 2, -1, 2, -1, 2, -1], // Row 1 (Player 2)
    [-1, 2, -1, 2, -1, 2, -1, 2], // Row 2 (Player 2)
    [0, -1, 0, -1, 0, -1, 0, -1], // Row 3 (Empty)
    [-1, 0, -1, 0, -1, 0, -1, 0], // Row 4 (Empty)
    [1, -1, 1, -1, 1, -1, 1, -1], // Row 5 (Player 1)
    [-1, 1, -1, 1, -1, 1, -1, 1], // Row 6 (Player 1)
    [1, -1, 1, -1, 1, -1, 1, -1], // Row 7 (Player 1)
  ],
  doubleJumpPossible: Piece[][] = [
    [-1, 0, -1, 2, -1, 2, -1, 2],
    [2, -1, 2, -1, 2, -1, 2, -1],
    [-1, 2, -1, 0, -1, 0, -1, 2],
    [2, -1, 2, -1, 2, -1, 0, -1],
    [-1, 1, -1, 0, -1, 1, -1, 0],
    [1, -1, 1, -1, 1, -1, 1, -1],
    [-1, 1, -1, 1, -1, 0, -1, 1],
    [1, -1, 1, -1, 0, -1, 1, -1],
  ],
  playerSidePossibleMoves = {
    [PieceSide.Top]: [
      {
        row: 1,
        col: 1,
      },
      {
        row: 1,
        col: -1,
      },
    ],
    [PieceSide.Bottom]: [
      {
        row: -1,
        col: -1,
      },
      {
        row: -1,
        col: 1,
      },
    ],
  },
  enemy = {
    [PieceSide.Top]: PieceSide.Bottom,
    [PieceSide.Bottom]: PieceSide.Top,
  },
  showPositionForEachBlock = false,
  boardSize = 8;

export {
  enemy,
  boardSize,
  initialBoardState,
  doubleJumpPossible,
  playerSidePossibleMoves,
  showPositionForEachBlock,
};
