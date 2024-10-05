import React from "react";
import logo from "assets/logo.svg";
import { pieceBelongsToSide, sideColor } from "utils/constants";
import { ColoredChipProps } from "./IColoredPieceProps";
import { PieceState } from "utils/enums";
import boardManagerInst from "classes/BoardManager";

const ColoredPiece: React.FC<ColoredChipProps> = ({
  col,
  row,
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
    if (pieceValue === PieceState.Empty || pieceValue === PieceState.Unusable)
      return false;
    // If it's not the player's turn, this piece can't be moved
    if (pieceBelongsToSide[pieceValue] !== currentTurn) return false;
    return (
      boardManagerInst.getPossibleMoves(row, col, pieceValue, currentTurn)
        .length > 0
    );
  };

  return (
    <div
      className={`w-full h-full rounded-full flex justify-center items-center ${
        sideColor[side]
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
