import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../axiosInstance';

export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePictureUrl: string | null;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  updateStatus: 'idle' | 'loading' | 'success' | 'error';
  updateError: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  updateStatus: 'idle',
  updateError: null,
};

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async (userName:string , thunkAPI) => {
    try {
      let response ;
      if(userName.length > 0){
         response = await axiosInstance.get(`/api/users/${userName}`);
      } else {
         response = await axiosInstance.get(`/api/users/`);
      }
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message || err.message || 'Failed to fetch users';
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ userName, formData }: { userName: string; formData: FormData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/api/users/${userName}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message || err.message || 'Failed to update user';
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update user cases
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = 'loading';
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = 'success';
        // Update the user in the users array
        const index = state.users.findIndex(user => user.userName === action.payload.userName);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = 'error';
        state.updateError = action.payload as string;
      });
  },
});

export const { resetUpdateStatus } = usersSlice.actions;
export default usersSlice.reducer; 