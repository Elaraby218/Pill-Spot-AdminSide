import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../axiosInstance";
import { IPharmacy } from "../../Pages/AdminHomePage/Pharmacy/types";
import { getAllPharmacies } from "./getAll";

interface IEditPharmacyData {
  name: string;
  contactNumber: string;
  openingTime: string;
  closingTime: string;
  isOpen24: boolean;
  daysOpen: string;
  logo?: File;
}

interface IPharmacyState {
  status: "idle" | "loading" | "error" | "success";
  message: string;
}

const initialState: IPharmacyState = {
  status: "idle",
  message: "",
};

export const editPharmacy = createAsyncThunk(
  "pharmacy/edit",
  async ({ pharmacyId, data }: { pharmacyId: string; data: IEditPharmacyData }, thunkAPI) => {
    try {
      const formData = new FormData();
      
      formData.append("name", data.name);
      formData.append("contactNumber", data.contactNumber);
      formData.append("openingTime", data.openingTime);
      formData.append("closingTime", data.closingTime);
      formData.append("isOpen24", data.isOpen24.toString());
      formData.append("daysOpen", data.daysOpen);
      
      if (data.logo) {
        formData.append("logo", data.logo);
      }

      const response = await axiosInstance.put<IPharmacy>(
        `/api/pharmacies/${pharmacyId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // After successful update, refresh the pharmacies list
      await thunkAPI.dispatch(getAllPharmacies());

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

const editPharmacySlice = createSlice({
  name: "editPharmacy",
  initialState,
  reducers: {
    resetEditPharmacyState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editPharmacy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPharmacy.fulfilled, (state) => {
        state.status = "success";
        state.message = "Pharmacy updated successfully";
      })
      .addCase(editPharmacy.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const { resetEditPharmacyState } = editPharmacySlice.actions;
export default editPharmacySlice.reducer;
