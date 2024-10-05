import { useCallback, useState } from "react";
import Board from "./components/Board";
import { PieceSide } from "./utils/enums";
import ResetButton from "components/ResetButton";
import ActivePlayerHighlighter from "components/ActivePlayerHighlighter";
import boardManagerInst from "classes/BoardManager";
import { Position } from "utils/types";

function App() {
  const [boardState, setBoardState] = useState(boardManagerInst.boardState);
  const [highlighted, setHighlighted] = useState<Position[]>([]);
  const [currentTurn, setCurrentTurn] = useState(PieceSide.Bottom);
  const [activePiece, setActivePiece] = useState<null | Position>(null);
  const [gameConclusion, setGameConclusion] = useState<null | PieceSide>(null);

  // call this function to reset the board
  const resetBoard = useCallback(() => {
    boardManagerInst.resetBoard();
    setBoardState(boardManagerInst.boardState);
    setHighlighted([]);
    setActivePiece(null);
    setCurrentTurn(PieceSide.Bottom);
    setGameConclusion(null);
  }, [setBoardState]);

  return (
    <div className="flex min-h-screen w-full p-4">
      <Board
        resetBoard={resetBoard}
        boardState={boardState}
        setBoardState={setBoardState}
        highlighted={highlighted}
        currentTurn={currentTurn}
        activePiece={activePiece}
        gameConclusion={gameConclusion}
        setActivePiece={setActivePiece}
        setHighlighted={setHighlighted}
        setCurrentTurn={setCurrentTurn}
        setGameConclusion={setGameConclusion}
      />
      <div className="px-4 flex flex-col gap-3">
        <ResetButton handleReset={resetBoard} />
        <ActivePlayerHighlighter activePlayer={currentTurn} />
      </div>
    </div>
  );
}

export default App;
