import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

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

const initialState: IInitialState = {
  curUser: null,
  status: "idle",
  Message: "",
};

const url = import.meta.env.VITE_GETUSER_URL;

export const getUser = createAsyncThunk(
  "/getUser",
  async (userName: string, thunkAPI) => {
    try {
      const response = await axios.get(`${url}${userName}`, {
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
    reducers:{},
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

export default curUserSlice.reducer ;
