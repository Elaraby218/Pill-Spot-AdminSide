import { IoIosNotifications } from "react-icons/io";
import LightDark from "../../../components/ToggleMode";

const Header = () => {
  return (
    <header className="flex justify-around items-center py-2 w-full">
      <div className="hidden items-center justify-center md:flex gap-2">
        <img
          src="/vite.svg"
          alt="this is image"
          className=" w-12 "
        />
        <div className="flex flex-col justify-around gap-">
          <h3 className="text-xl">name</h3>
          <h6 className="text-md">email</h6>
        </div>
      </div>

      <span className="flex text-2xl items-center justify-center">DashBoard</span>

      <div className="flex items-center justify-center gap-4">
        <IoIosNotifications className="text-4xl" />
        <LightDark/>
      </div>
    </header>
  );
};

export default Header;
