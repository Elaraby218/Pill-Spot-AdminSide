import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../axiosInstance";

export interface ICategory {
  id: string;
  name: string;
}

interface ICategoryState {
  categories: ICategory[];
  status: "idle" | "loading" | "error" | "success";
  message: string;
}

const initialState: ICategoryState = {
  categories: [],
  status: "idle",
  message: "",
};

export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      console.log('Fetching categories from API...');
      const response = await axiosInstance.get<ICategory[]>("/api/categories?pagenumber=1&pagesize=100000");
      console.log('API Response:', response.data);
      return response.data;
    } catch (err) {
      console.error('Error in getAllCategories:', err);
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

export const addCategory = createAsyncThunk(
  "category/add",
  async (categoryName: string, thunkAPI) => {
    try {
      console.log('Adding new category:', categoryName);
      const response = await axiosInstance.post<ICategory>("/api/categories", {
        name: categoryName,
      });
      console.log('Add category response:', response.data);
      return response.data;
    } catch (err) {
      console.error('Error in addCategory:', err);
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategoryState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Categories
      .addCase(getAllCategories.pending, (state) => {
        console.log('getAllCategories pending');
        state.status = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        console.log('getAllCategories fulfilled:', action.payload);
        state.status = "success";
        state.categories = action.payload;
        state.message = "";
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        console.log('getAllCategories rejected:', action.payload);
        state.status = "error";
        state.message = action.payload as string;
      })
      // Add Category
      .addCase(addCategory.pending, (state) => {
        console.log('addCategory pending');
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log('addCategory fulfilled:', action.payload);
        state.status = "success";
        state.categories.push(action.payload);
        state.message = "";
      })
      .addCase(addCategory.rejected, (state, action) => {
        console.log('addCategory rejected:', action.payload);
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer; 