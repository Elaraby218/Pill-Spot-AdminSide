import { useState } from "react";

const PharHeader = () => {
    const [active, setActive] = useState(1);
  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between rounded-3xl bg-[#2C3745] w-lg duration-200">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className={`p-4 w-1/3 rounded-3xl cursor-pointer transition-all duration-300 ease-in-out
                                ${
                                  active === num
                                    ? "bg-gray-400 scale-105 shadow-lg"
                                    : "bg-transparent"
                                }`}
            onClick={() => setActive(num)}
          >
            {num === 1 ? "Main Info" : num === 2 ? "Staff" : "Orders"}
          </button>
        ))}
      </div>
    </>
  );
};

export default PharHeader;
