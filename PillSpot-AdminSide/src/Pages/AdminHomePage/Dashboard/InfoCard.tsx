
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../../App/Store";

interface Iprops{
    title : string ; 
    number : number ;
    description : string ;
}


const InfoCard = ({title,number,description}:Iprops) => {
    const theme = useSelector((state: RootState) => state.ThemeSlice.theme);

  const [colors, setColors] = useState('');

  useEffect(() => {
    if (theme === 'light') {
      setColors('bg-gray-300 text-gray-700');
    } else {
      setColors('bg-[#2C3745] text-white');
    }
  }, [theme]);

  return (
    <div className="bg-base-100 rounded-3xl h-60 sm:h-64 md:h-72 w-64 sm:w-72 flex flex-col justify-around p-4 hover:bg-base-300 duration-300">
      {/* Title  */}
      <div className="flex items-center justify-between text-base sm:text-lg md:text-xl font-medium cursor-pointer">
        <span>{title}</span>
        <IoIosArrowForward className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </div>

      {/* Number  */}
      <div className={`w-full h-12 sm:h-14 md:h-16 rounded-[40px] text-xl sm:text-2xl flex items-center justify-center font-semibold ${colors}`}>
        {number}
      </div>

      {/* Description */}
      <div className="text-center text-xs sm:text-sm md:text-base text-gray-500 mt-2 px-2">
        {description}
      </div>
    </div>
  );
};

export default InfoCard;
