import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../axiosInstance";

interface IcurUser {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  dateOfBirth: string;
  gender: "Male" | "Female";
}

interface IInitialState {
  curUser: IcurUser | null;
  status: "idle" | "loading" | "error" | "success";
  Message: string;
}

// hello

const initialState: IInitialState = {
  curUser: null,
  status: "idle",
  Message: "",
};

const url = 'api/users/';
console.log("rulllllllllllllllll" , url)

export const getUser = createAsyncThunk(
  "/getUser",
  async (userName: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${url}${userName}`, {
        withCredentials: true,
      });
      return response.data;
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
);

export const curUserSlice = createSlice({
    name : 'curUserSlice' ,
    initialState ,
    reducers:{
        resetCurUser: (state) => {
            state.curUser = null;
            state.status = 'idle';
            state.Message = '';
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getUser.pending,(state)=>{
            state.status = "loading" ;
            state.Message = "";
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.status = 'success' ;
            state.curUser = action.payload
            state.Message = "success" ;
        })
        .addCase(getUser.rejected,(state,action)=>{
            state.status = 'error' ;
            state.curUser = null ; 
            state.Message = action.payload as string;
        })
    }
});

export const { resetCurUser } = curUserSlice.actions;

export default curUserSlice.reducer ;
