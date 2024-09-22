import { useCallback, useState } from "react";
import Board from "./components/Board";
import { PieceSide } from "./utils/enums";

function App() {
  const [resetBoardCounter, setResetBoardCounter] = useState<number>(0);
  const [activePlayer, setActivePlayer] = useState(PieceSide.Bottom);

  const handleCounterUpdate = () => {
    setResetBoardCounter((cur) => cur + 1);
  };

  const setPlayer = useCallback((player: PieceSide) => {
    setActivePlayer(player);
  }, []);

  return (
    <div className="flex p-4 min-h-screen">
      <div
        id="board"
        className="w-[50vw] h-[50vw] bg-green-500 grid grid-cols-8 grid-rows-8"
      >
        <Board boardResetCounter={resetBoardCounter} setPlayer={setPlayer} />
      </div>
      <div className="p-4">
        <button
          onClick={handleCounterUpdate}
          className="bg-red-500 p-4 rounded-md text-white"
        >
          Reset Board
        </button>
        <p className="grid-cols-5">
          {activePlayer === PieceSide.Top ? "Black's Turn" : "Red's turn"}
        </p>
      </div>
    </div>
  );
}

export default App;
