import { useState } from "react";
import PharInfo from "./pharSections/info";
import PharOrders from "./pharSections/orders";
import PharStaff from "./pharSections/staff";


const PharData = () => {
  const [active, setActive] = useState(0);

  const pages = [<PharInfo />, <PharStaff/> ,<PharOrders />];
 
  return (
    <>
    <div className="flex flex-col items-center w-full">
      <div className={`flex items-center justify-between rounded-3xl w-lg duration-200 bg-[#2C3745] dark:bg-gray-300`}>
        {[0, 1, 2].map((num) => (
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
            {num === 0 ? "Main Info" : num === 1 ? "Staff" : "Orders"}
          </button>
        ))}
      </div>
      
    </div>
    {pages[active]}
    </>
  );
};

export default PharData;
