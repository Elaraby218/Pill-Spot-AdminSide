import { useState } from "react";
import { MdDelete } from "react-icons/md";

const OneTask = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start mt-3 gap-3 w-full">
      <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span
        className={`text-gray-400 break-words w-full sm:max-w-[80%] ${
          checked ? "line-through decoration-white" : ""
        }`}
      >
        hasdfasdfl;ajsf;asfdasdf;jasdfasdfasdfasdfasdf;jasdf;jasdf
      </span>
      <MdDelete className="text-2xl sm:text-3xl hover:scale-110 cursor-pointer" />
    </div>
  );
};

export default OneTask;
