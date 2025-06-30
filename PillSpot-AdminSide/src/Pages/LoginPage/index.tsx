import TextInput from "../../components/input";
import Section1 from "./Section1";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import {loginSchema} from '../../Validations/Login' ;
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import LightDark from "../../components/ToggleMode";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLang } from "../../Featurs/Lang/lang";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../App/Store";
import { Login } from "../../Featurs/AuthLogin/auth";
import { toast } from "sonner";
import { getUser } from "../../Featurs/User/CurUser";
import { useNavigate } from "react-router-dom";



type TLoginData = {
    userName : string , 
    password : string ,
}

const AdminLogin = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { t} = useTranslation();
  const [userName,setUserName] = useState<string | null>(null) ;
  const mode = useSelector((state:RootState)=>state.ThemeSlice.theme)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginData>({resolver:zodResolver(loginSchema) , mode:"onBlur"});
  const currLang = useSelector((state:RootState)=>state.langSlice.lang);
  const loginState = useSelector((state:RootState)=>state.authLoginSlice);
  const curUser = useSelector((state:RootState)=>state.curUserSlice.curUser);
  const curUserStatus = useSelector((state:RootState)=>state.curUserSlice.status);

  useEffect(() => {
    if (loginState.status === "success") {
      toast.success("Authenticated");
      if (userName) {
        dispatch(getUser(userName));
      }
    } else if (loginState.status === "error") {
      toast.error("Authentication Failed");
    }
  }, [loginState.status, userName]);

  useEffect(() => {
    if (curUserStatus === "success" && curUser) {
      navigate("/admin-home/dashboard");
    }
  }, [curUserStatus, curUser, navigate]);

  const submitForm : SubmitHandler<TLoginData> = (data) => {
    //console.log(data) ;
    setUserName(data.userName);
    dispatch(Login(data));
    
  }


  const toggleLanguage = () => {
    dispatch(changeLang());
  };


  return (
    <div className="flex  h-screen gap-3 relative">
      <div className="flex-1 flex flex-col items-center justify-center relative ">
        <LightDark className="absolute top-6 right-5"/>  
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center">
          <TextInput name="userName" label={t("userName")} register={register} errors={errors}>
            <FaUser className="text-xl" />
          </TextInput>
          <TextInput name="password" label={t("password")} type="password" register={register} errors={errors}>
            <PiPasswordFill className="text-xl" />
          </TextInput>
          <button className="btn btn-soft bg-base-50 rounded-2xl w-60 mb-5">
            {loginState.status==="loading" && <span className="loading loading-spinner loading-lg"></span>}
            {t('logIn')}
          </button>

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
