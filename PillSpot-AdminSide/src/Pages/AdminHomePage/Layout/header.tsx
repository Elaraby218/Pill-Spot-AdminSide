import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../../App/Store";
import LightDark from "../../../components/ToggleMode";
import NotificationDrawer from "../../../components/NotificationDrawer";
import { useState } from "react";

const Header = () => {
  const curUser = useSelector((state: RootState) => state.curUserSlice.curUser);
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const handleNotificationClick = () => {
    setIsNotificationDrawerOpen(true);
  };

  const handleCloseNotificationDrawer = () => {
    setIsNotificationDrawerOpen(false);
  };

  return (
    <>
      <header className="flex justify-around items-center py-2 w-full">
        <div className="hidden items-center justify-center md:flex gap-2">
          <img
            src="/vite.svg"
            alt="this is image"
            className=" w-12 "
          />
          <div className="flex flex-col justify-around gap-1">
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {curUser ? `${curUser.firstName} ${curUser.lastName}` : 'Loading...'}
            </h3>
            <h6 className={`text-md ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {curUser ? curUser.email : 'Loading...'}
            </h6>
          </div>
        </div>

        <span className={`flex text-2xl items-center justify-center font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
         
        </span>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleNotificationClick}
            className={`relative p-2 rounded-full hover:bg-gray-100 transition-colors ${
              theme === 'dark' ? 'hover:bg-gray-700 text-white' : 'text-gray-700'
            }`}
          >
            <IoIosNotifications className="text-4xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
          <LightDark/>
        </div>
      </header>

      <NotificationDrawer 
        isOpen={isNotificationDrawerOpen} 
        onClose={handleCloseNotificationDrawer} 
      />
    </>
  );
};

export default Header;
