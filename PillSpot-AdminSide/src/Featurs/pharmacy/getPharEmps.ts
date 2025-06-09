import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { Employee } from "../../Pages/AdminHomePage/Pharmacy/types";

interface IPharmacyEmployeesState {
  employees: Employee[] | null;
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

const initialState: IPharmacyEmployeesState = {
  employees: null,
  status: "idle",
  message: "",
};

export const getPharmacyEmployees = createAsyncThunk(
  "pharmacyEmployees/getPharmacyEmployees",
  async (pharmacyId: string) => {
    try {
      const response = await axiosInstance.get<Employee[]>(`/api/pharmacy-employees/${pharmacyId}/employees`);
      return response.data;
    } catch {
      throw new Error("Failed to fetch employees");
    }
  }
);

const pharmacyEmployeesSlice = createSlice({
  name: "pharmacyEmployees",
  initialState,
  reducers: {
    resetPharmacyEmployees: (state) => {
      state.employees = null;
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPharmacyEmployees.pending, (state) => {
        state.status = "loading";
        state.message = "Loading employees...";
      })
      .addCase(getPharmacyEmployees.fulfilled, (state, action) => {
        state.status = "success";
        state.employees = action.payload;
        state.message = "Employees fetched successfully";
      })
      .addCase(getPharmacyEmployees.rejected, (state, action) => {
        state.status = "error";
        state.message = action.error.message || "Failed to fetch employees";
      });
  },
});

export const { resetPharmacyEmployees } = pharmacyEmployeesSlice.actions;
export default pharmacyEmployeesSlice.reducer; 