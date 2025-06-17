
import axiosInstance from "../../axiosInstance";

export interface IcurAdmin {
    userName : string ;
    firstName : string ;
    lastName : string ;
    userId : string ;
    email:string ;
}

export interface IinitialState {
    userName : string ,
    status : "idle" | "loading" | "error" | "success" ;
    Message : string ,
}

export interface IloginData {
    userName : string ;
    password : string ;
}

const apiUrl = import.meta.env.VITE_LOGIN_URL;

export const login = async (userData: IloginData) => {
    const response = await axiosInstance.post(apiUrl, userData );
    if (response.data) return userData.userName;
};