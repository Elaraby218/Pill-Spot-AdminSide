import { useState } from "react";
import PharInfo from "./pharSections/info";
import PharOrders from "./pharSections/orders";
import PharStaff from "./pharSections/staff";
import { IPharmacy } from "../types";

interface PharDataProps {
  pharmacy?: IPharmacy;
  onPharmacyUpdate?: (updatedPharmacy: IPharmacy) => void;
}

const PharData = ({ pharmacy, onPharmacyUpdate }: PharDataProps) => {
  const [active, setActive] = useState(0);

  const renderPage = () => {
    switch (active) {
      case 0:
        return <PharInfo pharmacy={pharmacy} onPharmacyUpdate={onPharmacyUpdate} />;
      case 1:
        return <PharStaff pharmacyId={pharmacy?.pharmacyId} />;
      case 2:
        return <PharOrders />;
      default:
        return null;
    }
  };
 
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
      {pharmacy ? renderPage() : (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl text-gray-500">Select a pharmacy to view details</p>
        </div>
      )}
    </>
  );
};

export default PharData;
