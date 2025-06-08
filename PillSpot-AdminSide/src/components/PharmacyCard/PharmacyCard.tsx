import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../App/Store";
import { IPharmacy } from "../../Pages/AdminHomePage/Pharmacy/types";

interface PharmacyCardProps {
  pharmacy: IPharmacy;
  onSelect: (pharmacy: IPharmacy) => void;
  isSelected?: boolean;
}

const PharmacyCard = ({ pharmacy, onSelect, isSelected }: PharmacyCardProps) => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

  const [colors, setColors] = useState("");

  useEffect(() => {
    if (theme === "light") {
      setColors("bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm");
    } else {
      setColors("bg-[#2C3745] hover:bg-[#37475A] text-white shadow-md");
    }
  }, [theme]);

  const base = "https://localhost:7298/";

  return (
    <div
      className={`w-full rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 ${colors} transition-all duration-300 mb-3 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={() => onSelect(pharmacy)}
    >
      {/* Image and Pharmacy Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
          <img 
            src={base+pharmacy.logoURL || "/vite.svg"} 
            alt="pharmacy-image" 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-base sm:text-lg font-semibold mb-1">
            {pharmacy.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {pharmacy.contactNumber}
          </p>
        </div>
      </div>

      {/* Link and Rating */}
      <div className="flex items-center justify-center w-full sm:w-auto">
        <button 
          className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-all duration-200"
          aria-label="View pharmacy details"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(pharmacy);
          }}
        >
          <FaLink className="text-2xl sm:text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default PharmacyCard;
