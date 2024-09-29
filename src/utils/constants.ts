import { PieceSide, PieceState } from "./enums";
import { Piece } from "./types";

const boardSize = 8,
  initialBoardState: Piece[][] = [
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
  kingState: Piece[][] = [
    [-1, 2, -1, 2, -1, 2, -1, 2],
    [2, -1, 0, -1, 0, -1, 0, -1],
    [-1, 2, -1, 0, -1, 0, -1, 2],
    [0, -1, 0, -1, 0, -1, 2, -1],
    [-1, 0, -1, 0, -1, 0, -1, 1],
    [2, -1, 0, -1, 1, -1, 0, -1],
    [-1, 0, -1, 1, -1, 0, -1, 1],
    [1, -1, 3, -1, 1, -1, 1, -1],
  ],
  kingMoves = [
    {
      row: 1,
      col: 1,
    },
    {
      row: 1,
      col: -1,
    },
    {
      row: -1,
      col: -1,
    },
    {
      row: -1,
      col: 1,
    },
  ],
  playerSidePossibleMoves = {
    [PieceState.TopPlayerPiece]: [
      {
        row: 1,
        col: 1,
      },
      {
        row: 1,
        col: -1,
      },
    ],
    [PieceState.BottomPlayerPiece]: [
      {
        row: -1,
        col: -1,
      },
      {
        row: -1,
        col: 1,
      },
    ],
    [PieceState.TopPlayerKing]: kingMoves,
    [PieceState.BottomPlayerKing]: kingMoves,
  },
  enemy = {
    [PieceSide.Top]: PieceSide.Bottom,
    [PieceSide.Bottom]: PieceSide.Top,
  },
  sideColor = {
    [PieceSide.Top]: "bg-black",
    [PieceSide.Bottom]: "bg-red-500",
  },
  royalRow = {
    [PieceSide.Top]: boardSize - 1,
    [PieceSide.Bottom]: 0,
  },
  sideKing = {
    [PieceSide.Top]: PieceState.TopPlayerKing,
    [PieceSide.Bottom]: PieceState.BottomPlayerKing,
  },
  showPositionForEachBlock = false;

export {
  enemy,
  royalRow,
  sideKing,
  kingState,
  sideColor,
  boardSize,
  initialBoardState,
  doubleJumpPossible,
  playerSidePossibleMoves,
  showPositionForEachBlock,
};
