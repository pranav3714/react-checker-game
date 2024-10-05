import { boardSize } from "./constants";
import { PieceSide, PieceState } from "./enums";
import { Piece } from "./types";
// not splitting this file as the number of functions are too low
// in future split each function into separate file

export const isWithinBounds = (row: number, col: number): boolean => {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
};

export const hasSomebodyWon = (boardState: Piece[][]): number | null => {
  let topPlayerPieces = 0,
    bottomPlayerPieces = 0;
  // Loop through the board to count the remaining pieces for both players
  for (let row = 0; row < boardState.length; row++) {
    for (let col = 0; col < boardState[row].length; col++) {
      const piece = boardState[row][col];
      // Count Top Player's pieces (normal and kings)
      if (
        piece === PieceState.TopPlayerPiece ||
        piece === PieceState.TopPlayerKing
      ) {
        topPlayerPieces++;
      }
      // Count Bottom Player's pieces (normal and kings)
      if (
        piece === PieceState.BottomPlayerPiece ||
        piece === PieceState.BottomPlayerKing
      ) {
        bottomPlayerPieces++;
      }
    }
  }
  // Check if either player has no remaining pieces
  if (topPlayerPieces === 0) {
    return PieceSide.Bottom; // Bottom Player wins
  }
  if (bottomPlayerPieces === 0) {
    return PieceSide.Top; // Top Player wins
  }
  // If both players still have pieces, the game is not over
  return null;
};

// deciding factor for rendering block color
export const isDarkSquare = (row: number, col: number) => {
  return (row + col) % 2 === 1;
};
