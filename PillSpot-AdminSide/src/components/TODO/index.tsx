import { MdAddCircle } from "react-icons/md";
import OneTask from "./oneTask";

const TODO = () => {
  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="flex w-full max-w-3xl flex-col items-start gap-4">
        <label htmlFor="task" className="text-base md:text-lg font-medium">
          Task
        </label>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center gap-3">
          <input
            type="text"
            id="task"
            className="input focus:outline-0 w-full rounded-2xl"
          />
          <button>
            <MdAddCircle className="text-4xl sm:text-5xl cursor-pointer hover:scale-110 duration-200" />
          </button>
        </div>

        <OneTask />
        <OneTask />
        <OneTask />
        <OneTask />
        <OneTask />
      </div>
    </div>
  );
};

export default TODO;
