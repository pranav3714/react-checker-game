import { GrPowerReset } from "react-icons/gr";
import { ResetButtonProps } from "./IResetButtonProps";

const ResetButton: React.FC<ResetButtonProps> = ({ handleReset }) => {
  return (
    <button
      className="bg-black p-2 py-4 rounded-md flex flex-col items-center"
      onClick={handleReset}
    >
      <GrPowerReset color="white" size={30} />
      <p className="text-white text-sm">Reset Game</p>
    </button>
  );
};

export default ResetButton;
