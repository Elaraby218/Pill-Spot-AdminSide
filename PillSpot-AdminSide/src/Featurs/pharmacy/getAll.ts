import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../axiosInstance";
import { IPharmacy } from "../../Pages/AdminHomePage/Pharmacy/types";

interface IPharmacyState {
  pharmacies: IPharmacy[];
  status: "idle" | "loading" | "error" | "success";
  message: string;
}

interface ISearchParams {
  SearchTerm?: string;
}

const initialState: IPharmacyState = {
  pharmacies: [],
  status: "idle",
  message: "",
};

export const getAllPharmacies = createAsyncThunk(
  "pharmacy/getAll",
  async (searchParams?: ISearchParams, thunkAPI?) => {
    try {
      const response = await axiosInstance.get<IPharmacy[]>("/api/pharmacies/AllPharmacies", {
        params: searchParams
      });
      return response.data || [];
    } catch (err) {
      if (err instanceof AxiosError) {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI?.rejectWithValue(message);
      }
      return thunkAPI?.rejectWithValue("An unknown error occurred");
    }
  }
);

const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    resetPharmacyState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPharmacies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPharmacies.fulfilled, (state, action) => {
        state.status = "success";
        state.pharmacies = action.payload ?? [];
        state.message = "";
      })
      .addCase(getAllPharmacies.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const { resetPharmacyState } = pharmacySlice.actions;
export default pharmacySlice.reducer;
