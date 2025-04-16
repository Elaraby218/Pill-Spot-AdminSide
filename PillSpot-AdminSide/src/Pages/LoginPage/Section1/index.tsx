import { useEffect, useRef } from "react";
import image2 from "../images/boxes-1744817627199.png";
import Typed from "typed.js";
import { useTranslation } from "react-i18next";

const st1 = {
  backgroundImage: `url(${image2})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Section1 = () => {
  const el = useRef(null);
  const typedInstance = useRef<Typed | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (typedInstance.current) {
      typedInstance.current.destroy();
    }
    typedInstance.current = new Typed(el.current, {
      strings: [
        "PillSpot",
        t("pSpot2"),
        t("pSpot3"),
      ],
      typeSpeed: 50,
      loop: true,
    });
    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, [i18n.language]); 

  return (
    <div
      className="hidden md:flex md:flex-col md:flex-1 xl:flex-3 md:items-center md:justify-center"
      style={st1}
    >
      <div
        className="w-full max-w-[90%] sm:max-w-[850px] h-[30vh] sm:h-[500px] rounded-[30px] flex items-center justify-around mx-auto backdrop-blur-md p-4 gap-10"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="flex-2">
          <span
            ref={el}
            className="text-shadow-white font-bold text-4xl sm:text-6xl text-white flex"
          />
        </div>
        <div className="divider lg:divider-horizontal">||</div>

        <div className="flex-1">
          <div className="flex flex-col gap-10 items-center text-xl">
            <button
              className="p-3 rounded-2xl w-50 hover:scale-105 duration-200 cursor-pointer"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
            >
              {t('getSrt')}
            </button>
            <button
              className="p-3 rounded-2xl w-50 hover:scale-105 duration-200 cursor-pointer border-gray-100 border-1"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              {t('createAcc')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
