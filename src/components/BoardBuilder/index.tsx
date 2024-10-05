import { boardSize } from "utils/constants";
import { BoardBuilderProps } from "./IBoardBuilderProps";
import SquareRenderer from "./SquareRenderer";

const BoardBuilder: React.FC<BoardBuilderProps> = ({
  boardState,
  highlighted,
  currentTurn,
  pieceClickHandler,
  highlightedBlockClickHandler,
}) => {
  return (
    <>
      {Array.from({ length: boardSize * boardSize }, (_, i) => {
        return (
          <SquareRenderer
            squareIndex={i}
            boardState={boardState}
            currentTurn={currentTurn}
            highlighted={highlighted}
            pieceClickHandler={pieceClickHandler}
            highlightedBlockClickHandler={highlightedBlockClickHandler}
          />
        );
      })}
    </>
  );
};

export default BoardBuilder;
