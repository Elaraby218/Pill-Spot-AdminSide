import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../App/Store";

const PharmacyCard = () => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

  const [colors, setColors] = useState("");

  useEffect(() => {
    if (theme === "light") {
      setColors("bg-gray-300 text-gray-700");
    } else {
      setColors("bg-[#2C3745] text-white");
    }
  }, [theme]);
  return (
    <div
      className={`min-h-[9vh] w-full rounded-xl py-2 px-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 ${colors} mb-2`}
    >
      {/* Image and Pharmacy Info */}
      <div className="flex items-center justify-center gap-3">
        <img src="/vite.svg" alt="pharmacy-image" className="w-16" />
        <div className="text-center md:text-left">
          <h2 className="text-base md:text-lg font-semibold">
            PHarmacy el pharmacy
          </h2>
          <h2 className="text-sm md:text-base text-gray-600">12312312312</h2>
        </div>
      </div>

      {/* Link and Rating */}
      <div className="flex items-center justify-center">
        <FaLink className="text-3xl md:text-4xl cursor-pointer hover:scale-110 duration-200" />
      </div>
    </div>
  );
};

export default PharmacyCard;
