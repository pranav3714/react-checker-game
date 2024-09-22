import { PieceSide } from "utils/enums";

export interface GameConclusionProps {
  winner: PieceSide;
  retryHandler: () => void;
}
