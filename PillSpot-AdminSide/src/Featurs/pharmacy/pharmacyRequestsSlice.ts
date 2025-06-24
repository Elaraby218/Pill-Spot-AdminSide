import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { PharmacyRequest } from '../../Pages/phamaciesRequests/types';
import axiosInstance from '../../axiosInstance';

interface PharmacyRequestsState {
  requests: PharmacyRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: PharmacyRequestsState = {
  requests: [],
  loading: false,
  error: null,
};

export const fetchPharmacyRequests = createAsyncThunk(
  'pharmacyRequests/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('api/pharmacy-requests?PageNumber=1&PageSize=100');
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return thunkAPI.rejectWithValue('Please login to access this resource');
        }
        const message = err.response?.data?.message || err.message || 'Failed to fetch pharmacy requests';
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const acceptPharmacyRequest = createAsyncThunk(
  'pharmacyRequests/accept',
  async (requestId: string, thunkAPI) => {
    try {
      await axiosInstance.patch(`/api/pharmacy-requests/${requestId}/Approve`);
      return requestId;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return thunkAPI.rejectWithValue('Please login to access this resource');
        }
        const message = err.response?.data?.message || err.message || 'Failed to accept request';
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const rejectPharmacyRequest = createAsyncThunk(
  'pharmacyRequests/reject',
  async (requestId: string, thunkAPI) => {
    try {
      await axiosInstance.patch(`/api/pharmacy-requests/${requestId}/reject`);
      return requestId;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return thunkAPI.rejectWithValue('Please login to access this resource');
        }
        const message = err.response?.data?.message || err.message || 'Failed to reject request';
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

const pharmacyRequestsSlice = createSlice({
  name: 'pharmacyRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPharmacyRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacyRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchPharmacyRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(acceptPharmacyRequest.fulfilled, (state, action) => {
        const request = state.requests.find(r => r.requestId === action.payload);
        if (request) {
          request.status = 'Accepted';
        }
      })
      .addCase(rejectPharmacyRequest.fulfilled, (state, action) => {
        const request = state.requests.find(r => r.requestId === action.payload);
        if (request) {
          request.status = 'Rejected';
        }
      });
  },
});

export default pharmacyRequestsSlice.reducer; 