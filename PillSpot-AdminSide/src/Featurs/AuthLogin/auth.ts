import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IinitialState, IloginData, login } from "./authServices";
import { AxiosError } from "axios";

const initialState : IinitialState = {
    userName : "" ,
    status : 'idle' ,
    Message : ""
}



export const Login = createAsyncThunk(
    'auth/login',
    async (data:IloginData , thunkAPI) => {
        try{
            return await login(data) ; 
        } catch (err) {
            if (err instanceof AxiosError) {
              const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();
              return thunkAPI.rejectWithValue(message);
            }
            return thunkAPI.rejectWithValue("An unknown error occurred");
          }
    }
    

)


export const authLoginSlice = createSlice({
    name : 'authLoginSlice' , 
    initialState ,
    reducers : {
        resetLogin : (state) => {
            state.status = "idle" ;
            state.Message = "" ;
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(Login.pending , (state)=>{
            state.status = "loading" ;
        })
        .addCase(Login.fulfilled,(state,action)=>{
            state.status = "success" ;
            state.userName = action.payload ?? "" ;
            state.Message = "" ;
        })
        .addCase(Login.rejected,(state,action)=>{
            state.status = "error" ;
            state.Message = action.payload as string ;
            state.userName = "" ;
        })
    }
});



export const {resetLogin} = authLoginSlice.actions ;
export default authLoginSlice.reducer ;