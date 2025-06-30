import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../../App/Store";
import Header from "./header";
import Sider from "./sider";
import { motion } from "framer-motion";

const HomePageLayout = () => {
  const curUser = useSelector((state: RootState) => state.curUserSlice.curUser);
  const navigate = useNavigate();
  const location = useLocation();
  const curTheme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const [colors, setColors] = useState("");

  useEffect(() => {
    if (curTheme === "light") {
      setColors("bg-gray-300 text-gray-700");
    } else {
      setColors("bg-[#2C3745] text-white");
    }
  }, [curTheme]);

  //console.log(curUser);

  // useEffect(() => {
  //   if (!curUser) {
  //     navigate("/", { replace: true });
  //   }
  // }, [curUser, navigate]);

  if (!curUser) {
    navigate("/", { replace: true });
  }

  return (
    <>
      <main className="w-full">
        <div className="flex items-start">
          <Sider />
          <div className="flex flex-col w-full gap-5 ">
            <Header />
            {/* <div className="divider"></div> */}
            <div className={`h-[90vh] max-h-[90vh] mx-10 rounded-3xl p-5 ${colors} overflow-auto`}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePageLayout;
