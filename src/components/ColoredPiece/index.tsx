import React from "react";
import logo from "assets/logo.svg";
import {
  enemy,
  sideKing,
  boardSize,
  pieceBelongsToSide,
  playerSidePossibleMoves,
} from "utils/constants";
import { ColoredChipProps } from "./IColoredPieceProps";
import { PieceSide, PieceState } from "utils/enums";
import { isWithinBounds } from "utils/helper";

const ColoredPiece: React.FC<ColoredChipProps> = ({
  col,
  row,
  boardState,
  currentTurn,
  onPieceClick,
  pieceValue,
}) => {
  const side =
    pieceBelongsToSide[pieceValue as keyof typeof pieceBelongsToSide];
  if (!side) {
    return <></>;
  }
  // Checks if the current piece has any valid moves for the player
  const hasValidMoves = (): boolean => {
    if (pieceValue === PieceState.Empty || pieceValue === PieceState.Unusable) {
      return false;
    }
    // If it's not the player's turn, this piece can't be moved
    if (pieceBelongsToSide[pieceValue] !== currentTurn) {
      return false;
    }
    // Calculate all possible moves for the player's side
    // Map each possible move direction (row and col additions) to the new board position
    const allPossibleMoves = playerSidePossibleMoves[pieceValue]
      .map(({ row: rowAdd, col: colAdd }) => [
        row + rowAdd, // new row position
        col + colAdd, // new column position
        rowAdd, // row direction (for later use)
        colAdd, // column direction (for later use)
      ])
      // Filter out moves that are out of bounds (board edges)
      .filter(
        ([newRow, newCol]) =>
          newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize
      );

    // Loop through each possible move
    for (let index = 0; index < allPossibleMoves.length; index++) {
      const move = allPossibleMoves[index];

      // Check if the destination square is empty (valid move)
      if (boardState[move[0]][move[1]] === PieceState.Empty) {
        return true; // A valid move is found
      }

      // Check if the destination square has an enemy piece (jump possibility)
      if (
        [enemy[side], sideKing[enemy[side]]].includes(
          boardState[move[0]][move[1]]
        )
      ) {
        const jumpRow = move[0] + move[2]; // Calculate row after jump
        const jumpCol = move[1] + move[3]; // Calculate column after jump

        // Ensure the jump position is within bounds
        if (!isWithinBounds(jumpRow, jumpCol)) continue;

        // Check if the square after the enemy piece is empty (valid jump)
        if (boardState[jumpRow][jumpCol] === PieceState.Empty) {
          return true; // A valid jump is found
        }
      }
    }
    // No valid moves found, return false
    return false;
  };

  return (
    <div
      className={`w-full h-full rounded-full flex justify-center items-center ${
        PieceSide.Top === side ? "bg-black" : "bg-red-500"
      } ${hasValidMoves() ? "cursor-pointer" : "cursor-not-allowed"}`}
      onClick={
        hasValidMoves()
          ? () => onPieceClick({ row, col, side, pieceValue })
          : () => {}
      }
    >
      {[PieceState.TopPlayerKing, PieceState.BottomPlayerKing].includes(
        pieceValue
      ) ? (
        <img src={logo} alt="king-highlighter" />
      ) : null}
    </div>
  );
};

export default ColoredPiece;
