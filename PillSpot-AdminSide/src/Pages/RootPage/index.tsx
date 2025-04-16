
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../App/Store";
import { useEffect } from "react";

const RootPage = () => {
  const { i18n } = useTranslation();
  const currLang = useSelector((state:RootState)=> state.langSlice.lang) ;
  useEffect(()=>{
    i18n.changeLanguage(currLang);
  },[currLang])
  
  return (
    <div>
      
      <div className="font-bold mx-auto h-screen" dir={`${currLang === 'ar' ? "rtl" : "ltr"}`} >
        <Outlet />
      </div>
    </div>
  );
};

export default RootPage;
