import TextInput from "../../components/input";
import Section1 from "./Section1";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import {loginSchema} from '../../Validations/Login' ;
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "antd";
import { useState } from "react";
import LightDark from "../../components/ToggleMode";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLang } from "../../Featurs/Lang/lang";
import { useSelector } from "react-redux";
import { RootState } from "../../App/Store";


type TLoginData = {
    userName : string , 
    password : string ,
}

const AdminLogin = () => {
  const dispatch = useDispatch();
  const { t} = useTranslation();
  const [mode,setMode] = useState("dark") ;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginData>({resolver:zodResolver(loginSchema) , mode:"onBlur"});
  const currLang = useSelector((state:RootState)=>state.langSlice.lang);
  const submitForm : SubmitHandler<TLoginData> = (data) => {
    console.log(data) ;
  }

  function handleToggleMode(){
        if(mode === 'light') setMode('dark') ;
        else setMode('light');
  }
  const toggleLanguage = () => {
    dispatch(changeLang());
  };

  return (
    <div className="flex  h-screen gap-3 relative" data-theme={mode}>
      <div className="flex-1 flex flex-col items-center justify-center relative ">
        <LightDark onClick={handleToggleMode} className="absolute top-6 right-5"/>  
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center">
          <TextInput name="userName" label={t("userName")} register={register} errors={errors}>
            <FaUser className="text-xl" />
          </TextInput>
          <TextInput name="password" label={t("password")} type="password" register={register} errors={errors}>
            <PiPasswordFill className="text-xl" />
          </TextInput>
          <button className="btn btn-soft bg-base-50 rounded-2xl w-60 mb-5">{t('logIn')}</button>

          <div className="flex flex-col items-center gap-2">
            <Checkbox>
                <span className={`${mode === 'dark' ? "text-white" : "text-black"}`}>{t("stayLogin")}</span>
            </Checkbox>

            <button onClick={(e)=>{e.preventDefault()}} className="decoration cursor-pointer  hover:scale-102"> 
                {t("forgetPass")}
            </button>
          </div>
        </form>

        <div className="absolute bottom-10 flex items-center justify-center ">
            <button onClick={toggleLanguage} className="btn mt-4">
                {currLang === "en" ? "عربي" : "English"}
            </button>
        </div>

      </div>
      <Section1 />
    </div>
  );
};

export default AdminLogin;
