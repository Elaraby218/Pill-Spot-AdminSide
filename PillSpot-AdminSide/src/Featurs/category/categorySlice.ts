import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosInstance from "../../axiosInstance";

export interface ICategory {
  categoryId: string;
  name: string;
}

interface ICategoryState {
  categories: ICategory[];
  selectedCategory: ICategory | null;
  status: "idle" | "loading" | "error" | "success";
  message: string;
}

const initialState: ICategoryState = {
  categories: [],
  selectedCategory: null,
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

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryId: string, thunkAPI) => {
    try {
      console.log('Deleting category:', categoryId);
      await axiosInstance.delete(`/api/categories/${categoryId}`);
      return categoryId;
    } catch (err) {
      console.error('Error in deleteCategory:', err);
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
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
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
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        console.log('deleteCategory pending');
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log('deleteCategory fulfilled:', action.payload);
        state.status = "success";
        state.categories = state.categories.filter(cat => cat.categoryId !== action.payload);
        // Clear selected category if it was deleted
        if (state.selectedCategory?.categoryId === action.payload) {
          state.selectedCategory = null;
        }
        state.message = "";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        console.log('deleteCategory rejected:', action.payload);
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const { resetCategoryState, setSelectedCategory, clearSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer; 