import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../App/Store'
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { BsBuildingFillGear } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../Featurs/AuthLogin/authServices'
import { resetCurUser } from '../../../Featurs/User/CurUser'
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdFeedback } from "react-icons/md";
import { MdNoteAdd } from "react-icons/md";
import { MdSell } from "react-icons/md";
import { MdNotificationAdd } from "react-icons/md";

import { NavLink } from 'react-router-dom';
import { resetLogin } from '../../../Featurs/AuthLogin/auth';

const Sider = () => {
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [colors, setColors] = useState('');

  async function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    dispatch(resetLogin());
    await logout();
    dispatch(resetCurUser());
    navigate('/');
  }

  useEffect(() => {
    if (theme === 'light') {
      setColors('bg-gray-300 text-gray-700');
    } else {
      setColors('bg-[#2C3745] text-white');
    }
  }, [theme]);

  const iconStyle = 'hover:scale-130 duration-200 hover:bg-base-100 w-12 h-12 rounded-full p-2 '

  return (
    <aside className={`hidden sm:flex h-screen w-fit flex-col justify-around items-start px-5 rounded-tr-3xl rounded-br-3xl transition-colors duration-300 ${colors} text-4xl`}>
      <NavLink to={"dashboard"} className="tooltip hover:tooltip-open tooltip-right" data-tip="Dashboard">
        <MdSpaceDashboard className={iconStyle} />
      </NavLink>

      <NavLink to={"pharmacy"} className="tooltip hover:tooltip-open tooltip-right" data-tip="Pharmacy Management">
        <BsBuildingFillGear className={iconStyle} />
      </NavLink>

      <NavLink to={"users"} className="tooltip hover:tooltip-open tooltip-right" data-tip="Users Management">
        <FaUsersGear className={iconStyle} />
      </NavLink>

      <NavLink to={"feedback"} className="tooltip hover:tooltip-open tooltip-right" data-tip="Users feedbacks">
        <MdFeedback className={iconStyle} />
      </NavLink>
      <NavLink to={"pharmacyies-requests"} className="tooltip hover:tooltip-open tooltip-right" data-tip="Pharmacy requests">
        <MdNoteAdd className={iconStyle} />
      </NavLink>
      <NavLink to={"addproduct"} className="tooltip hover:tooltip-open tooltip-right" data-tip="Products Management">
        <MdSell className={iconStyle} />
      </NavLink>
      <NavLink to={"manage-notification"} className="tooltip hover:tooltip-open tooltip-right" data-tip="Notificaton Management">
        <MdNotificationAdd className={iconStyle} />
      </NavLink>

      <div>
        <div className='divider'></div>
        <NavLink to={"/"} onClick={handleLogout} className="tooltip hover:tooltip-open tooltip-right" data-tip="Logout">
          <RiLogoutCircleLine className={iconStyle} />
        </NavLink>
      </div>
    </aside>
  );
};

export default Sider
