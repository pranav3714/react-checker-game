import {
  enemy,
  sideKing,
  royalRow,
  initialBoardState,
  pieceBelongsToSide,
  playerSidePossibleMoves,
} from "utils/constants";
import { PieceSide, PieceState } from "utils/enums";
import { isWithinBounds } from "utils/helper";
import { Piece, Position } from "utils/types";

class BoardManager {
  boardState = initialBoardState;

  isOpponentPiece = (
    row: number,
    col: number,
    currentTurn: PieceSide
  ): boolean => {
    return [enemy[currentTurn], sideKing[enemy[currentTurn]]].includes(
      this.boardState[row][col]
    );
  };

  // get possible moves for a piece given the current position and surrent turn
  getPossibleMoves = (
    row: number,
    col: number,
    pieceValue: PieceState,
    currentTurn: PieceSide
  ) => {
    const validMoves: Position[] = [],
      side = pieceBelongsToSide[pieceValue as keyof typeof pieceBelongsToSide];
    if (!side) {
      return [];
    }
    if (pieceValue === PieceState.Empty || pieceValue === PieceState.Unusable)
      return [];
    playerSidePossibleMoves[pieceValue].forEach(
      ({ row: rowDir, col: colDir }) => {
        const newRow = row + rowDir;
        const newCol = col + colDir;
        // Ensure move is within bounds and on a valid block
        if (!isWithinBounds(newRow, newCol)) return;

        const jumpRow = newRow + rowDir;
        const jumpCol = newCol + colDir;
        if (this.boardState[newRow][newCol] === PieceState.Empty) {
          validMoves.push({
            row: newRow,
            col: newCol,
            side: side,
            pieceValue: this.boardState[newRow][newCol],
          });
        }
        if (
          isWithinBounds(jumpRow, jumpCol) &&
          this.isOpponentPiece(newRow, newCol, currentTurn) &&
          this.boardState[jumpRow][jumpCol] === PieceState.Empty
        ) {
          validMoves.push({
            row: jumpRow,
            col: jumpCol,
            side: side,
            pieceValue: this.boardState[jumpRow][jumpCol],
          });
        }
      }
    );
    return validMoves;
  };

  // call this method to update the in memory board state
  updateBoardState = (newBoardState: Piece[][]) => {
    this.boardState = newBoardState;
  };

  // this method performed the in memory board state update and returns the new state for FC
  updateBoardStateAfterTheMove = (
    activePiece: Position,
    rowToMove: number,
    colToMove: number
  ) => {
    const hardCopy = this.boardState.map((fullRow) => [...fullRow]);
    if (rowToMove === royalRow[activePiece.side]) {
      hardCopy[rowToMove][colToMove] = sideKing[activePiece.side];
    } else {
      hardCopy[rowToMove][colToMove] = activePiece.pieceValue;
    }
    hardCopy[activePiece.row][activePiece.col] = PieceState.Empty;

    // diff between previous piece state and the latest piece state
    const rowDiff = rowToMove - activePiece.row;
    const colDiff = colToMove - activePiece.col;
    // Check if the move was a jump (capture)
    if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
      // Calculate the position of the opponent piece
      const jumpedRow = activePiece.row + rowDiff / 2;
      const jumpedCol = activePiece.col + colDiff / 2;
      // Set the opponent piece to empty
      hardCopy[jumpedRow][jumpedCol] = PieceState.Empty;
    }
    this.boardState = hardCopy;
    return hardCopy;
  };

  // call this method to reset the in memory board
  resetBoard = () => {
    this.boardState = initialBoardState;
  };
}

const boardManagerInst = new BoardManager();

export default boardManagerInst;
