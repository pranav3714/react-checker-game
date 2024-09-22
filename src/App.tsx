import { useCallback, useState } from "react";
import Board from "./components/Board";
import { PieceSide } from "./utils/enums";
import { initialBoardState } from "utils/constants";
import ResetButton from "components/ResetButton";
import ActivePlayerHighlighter from "components/ActivePlayerHighlighter";

function App() {
  const [boardState, setBoardState] = useState(initialBoardState);
  const [resetBoardCounter, setResetBoardCounter] = useState<number>(0);
  const [activePlayer, setActivePlayer] = useState(PieceSide.Bottom);

  const handleCounterUpdate = () => {
    setResetBoardCounter((cur) => cur + 1);
  };

  const setPlayer = useCallback((player: PieceSide) => {
    setActivePlayer(player);
  }, []);

  return (
    <div className="flex min-h-screen w-full p-4">
      <Board
        boardResetCounter={resetBoardCounter}
        setPlayer={setPlayer}
        boardState={boardState}
        setBoardState={setBoardState}
      />
      <div className="px-4 flex flex-col gap-3">
        <ResetButton handleCounterUpdate={handleCounterUpdate} />
        <ActivePlayerHighlighter activePlayer={activePlayer} />
      </div>
    </div>
  );
}

export default App;
