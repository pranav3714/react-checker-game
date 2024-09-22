import { PieceSide } from "utils/enums";
import { ActivePlayerHighlighterProps } from "./IActivePlayerHighlighterProps";

const ActivePlayerHighlighter: React.FC<ActivePlayerHighlighterProps> = ({
  activePlayer,
}) => {
  return (
    <div className="bg-yellow-900 rounded-md flex flex-col">
      <div
        className={`h-1/2 m-2 p-3 rounded-md ${
          activePlayer === PieceSide.Top
            ? "bg-white/10 animate-pulse border"
            : ""
        }`}
      >
        <div className="rounded-full bg-black w-10 h-10 mx-auto" />
      </div>
      <div
        className={`h-1/2 m-2 p-3 rounded-md ${
          activePlayer === PieceSide.Bottom
            ? "bg-white/10 animate-pulse border"
            : ""
        }`}
      >
        <div className="rounded-full bg-red-500 w-10 h-10 mx-auto" />
      </div>
    </div>
  );
};

export default ActivePlayerHighlighter;
