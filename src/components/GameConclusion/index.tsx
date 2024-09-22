import React from "react";
import { FaStar } from "react-icons/fa";
import { GameConclusionProps } from "./IGameConclusionProps";
import { sideColor } from "utils/constants";

const GameConclusion: React.FC<GameConclusionProps> = ({
  winner,
  retryHandler,
}) => {
  return (
    <div className="absolute inset-0 bg-black/30 z-10 flex justify-center items-center">
      <div className="bg-white p-5 rounded-md flex flex-col justify-center items-center gap-2">
        <FaStar size={70} color="#FFD700" />
        <p className="p-5 text-3xl">Congrats Winner!</p>
        <div className="border border-black rounded-md p-3">
          <div className={`w-16 h-16 rounded-full ${sideColor[winner]}`} />
        </div>
        <button
          className="bg-black w-full p-4 my-5 mb-2 rounded-md text-white"
          onClick={retryHandler}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default GameConclusion;
