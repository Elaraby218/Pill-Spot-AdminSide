import { BsBuildingFillGear } from "react-icons/bs";
import { FaUsersGear } from "react-icons/fa6";
import { MdFeedback, MdNoteAdd, MdSell } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import { MdOutlineQuestionMark } from "react-icons/md";
import { useDispatch } from "react-redux";
import { resetLogin } from "../../../Featurs/AuthLogin/auth";
import { logout } from "../../../Featurs/AuthLogin/authServices";
import { resetCurUser } from "../../../Featurs/User/CurUser";

const cardData = [
  {
    label: "Pharmacy Management",
    icon: BsBuildingFillGear,
    to: "/admin-home/pharmacy",
  },
  {
    label: "Users Management",
    icon: FaUsersGear,
    to: "/admin-home/users",
  },
  {
    label: "Users Feedbacks",
    icon: MdFeedback,
    to: "/admin-home/feedback",
  },
  {
    label: "Pharmacy Requests",
    icon: MdNoteAdd,
    to: "/admin-home/pharmacyies-requests",
  },
  {
    label: "Products Management",
    icon: MdSell,
    to: "/admin-home/addproduct",
  },
  {
    label: "Logout",
    icon: RiLogoutCircleLine,
    to: "/",
    isLogout: true,
  },
  {
    label: "Coming Soon",
    icon: MdOutlineQuestionMark,
    to: "#",
    isFake: true,
  },
  {
    label: "Placeholder",
    icon: MdOutlineQuestionMark,
    to: "#",
    isFake: true,
  },
  {
    label: "Placeholder",
    icon: MdOutlineQuestionMark,
    to: "#",
    isFake: true,
  },
];

type ButtonCardProps = {
  label: string;
  icon: React.ElementType;
  to: string;
  delay?: number;
  isLogout?: boolean;
  onLogout?: () => void;
};

const ButtonCard: React.FC<ButtonCardProps> = ({ label, icon: Icon, to, delay = 0, isLogout = false, onLogout }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (isLogout && onLogout) {
      onLogout();
    } else {
      navigate(to);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col bg-base-100 w-sm h-50 items-center justify-center rounded-3xl hover:scale-102 duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <Icon size={80} className="hover:scale-110 duration-150" />
      <div className="text-xl mt-5 text-center">
        {label}
      </div>
    </motion.div>
  );
};

const AdminDashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const delaysRow1 = [0, 0.1, 0.2];
  const delaysRow2 = [0.3, 0.4, 0.5, 0.6];
  const delaysRow3 = [0.7, 0.8, 0.9, 1.0, 1.1];
  const row1 = cardData.slice(0, 3);
  const row2 = cardData.slice(3, 7);
  const row3 = cardData.slice(7);

  const handleLogout = async () => {
    dispatch(resetLogin());
    await logout();
    dispatch(resetCurUser());
    navigate('/');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-7 my-[5%] w-full">
        <div className="flex flex-row items-center justify-center gap-8 w-full">
          {row1.map((card, i) => (
            <ButtonCard key={card.label} {...card} delay={delaysRow1[i]} onLogout={handleLogout} />
          ))}
        </div>
        <div className="flex flex-row items-center justify-center gap-8 w-full">
          {row2.map((card, i) => (
            <ButtonCard key={card.label} {...card} delay={delaysRow2[i]} onLogout={handleLogout} />
          ))}
        </div>
        {row3.length > 0 && (
          <div className="flex flex-row items-center justify-center gap-8 w-full">
            {row3.map((card, i) => (
              <ButtonCard key={card.label} {...card} delay={delaysRow3[i]} onLogout={handleLogout} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashBoard;
