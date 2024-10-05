import ColoredPiece from "components/ColoredPiece";
import { SquareRendererProps } from "./ISquareRendererProps";
import { boardSize } from "utils/constants";
import { isDarkSquare } from "utils/helper";
import { SquareColor } from "utils/enums";

const SquareRenderer: React.FC<SquareRendererProps> = ({
  boardState,
  highlighted,
  squareIndex,
  currentTurn,
  pieceClickHandler,
  highlightedBlockClickHandler,
}) => {
  const row = Math.floor(squareIndex / boardSize);
  const col = squareIndex % boardSize;
  const squareColor = isDarkSquare(row, col)
    ? SquareColor.Dark
    : SquareColor.Light;
  const isHighlighted = highlighted.some(
    (pos) => pos.row === row && pos.col === col
  );
  return (
    <div
      key={`${row}-${col}`}
      className={`${squareColor} w-full h-full flex justify-center items-center relative p-3`}
    >
      {isHighlighted && (
        <div
          className="absolute w-full h-full border border-white cursor-pointer"
          onClick={() => highlightedBlockClickHandler(row, col)}
        />
      )}
      <ColoredPiece
        row={row}
        col={col}
        key={`${row}${col}`}
        boardState={boardState}
        currentTurn={currentTurn}
        onPieceClick={pieceClickHandler}
        pieceValue={boardState[row][col]}
      />
    </div>
  );
};

export default SquareRenderer;
