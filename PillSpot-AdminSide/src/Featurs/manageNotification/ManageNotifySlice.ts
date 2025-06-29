import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { 
  getNotificationsForUser, 
  getUnreadNotificationCount, 
  getUnreadNotifications, 
  sendNotificationByUsername 
} from './ManageNotificationService';

// Types
export interface Notification {
  notificationId: string;
  userId: string;
  actorId: string | null;
  title: string;
  message: string;
  content: string;
  type: string;
  data: string;
  relatedEntityId: string | null;
  relatedEntityType: string | null;
  isRead: boolean;
  isNotified: boolean;
  isBroadcast: boolean;
  isDeleted: boolean;
  createdDate: string;
  notifiedDate: string | null;
  modifiedDate: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  unreadNotifications: Notification[];
  loading: boolean;
  error: string | null;
  sendStatus: 'idle' | 'loading' | 'success' | 'error';
  sendError: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  unreadNotifications: [],
  loading: false,
  error: null,
  sendStatus: 'idle',
  sendError: null,
};


export const fetchNotificationsForUser = createAsyncThunk(
  'notifications/fetchForUser',
  async (username: string, thunkAPI) => {
    try {
      return await getNotificationsForUser(username);
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = 
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchUnreadNotificationCount = createAsyncThunk(
  'notifications/fetchUnreadCount',
  async (username: string, thunkAPI) => {
    try {
      return await getUnreadNotificationCount(username);
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = 
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchUnreadNotifications = createAsyncThunk(
  'notifications/fetchUnread',
  async (username: string, thunkAPI) => {
    try {
      return await getUnreadNotifications(username);
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = 
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export const sendNotification = createAsyncThunk(
  'notifications/send',
  async (notificationData: {
    username: string;
    actorId: string | null;
    title: string;
    message: string;
    content: string;
    type: string;
    data: string;
    relatedEntityId: string | null;
    relatedEntityType: string | null;
    isBroadcast: boolean;
  }, thunkAPI) => {
    try {
      return await sendNotificationByUsername(notificationData);
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = 
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

// Slice
export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetNotificationState: (state) => {
      state.loading = false;
      state.error = null;
      state.sendStatus = 'idle';
      state.sendError = null;
      state.notifications = [];
      state.unreadNotifications = [];
      state.unreadCount = 0;
    },
    resetSendStatus: (state) => {
      state.sendStatus = 'idle';
      state.sendError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications for user
      .addCase(fetchNotificationsForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications || action.payload;
        state.error = null;
      })
      .addCase(fetchNotificationsForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch unread count
      .addCase(fetchUnreadNotificationCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnreadNotificationCount.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both object response with count property and direct number
        if (typeof action.payload === 'object' && action.payload !== null && 'count' in action.payload) {
          state.unreadCount = (action.payload as { count: number }).count;
        } else {
          state.unreadCount = action.payload as number;
        }
        state.error = null;
      })
      .addCase(fetchUnreadNotificationCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch unread notifications
      .addCase(fetchUnreadNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnreadNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.unreadNotifications = action.payload.notifications || action.payload;
        state.error = null;
      })
      .addCase(fetchUnreadNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Send notification
      .addCase(sendNotification.pending, (state) => {
        state.sendStatus = 'loading';
        state.sendError = null;
      })
      .addCase(sendNotification.fulfilled, (state) => {
        state.sendStatus = 'success';
        state.sendError = null;
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.sendStatus = 'error';
        state.sendError = action.payload as string;
      });
  },
});

export const { resetNotificationState, resetSendStatus } = notificationSlice.actions;
export default notificationSlice.reducer;
