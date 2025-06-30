import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  fetchNotifications,
  getNotificationById,
  deleteNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
  getUnreadNotifications
} from './notificationsServices';

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
    modifiedDate: string | null;
    avatarUrl?: string;
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
  unreadNotifications: Notification[];
  selectedNotification: Notification | null;
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchStatus: 'idle' | 'loading' | 'success' | 'error';
  deleteStatus: 'idle' | 'loading' | 'success' | 'error';
  markReadStatus: 'idle' | 'loading' | 'success' | 'error';
  markAllReadStatus: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: NotificationState = {
  notifications: [],
  unreadNotifications: [],
  selectedNotification: null,
  unreadCount: 0,
  loading: false,
  error: null,
  fetchStatus: 'idle',
  deleteStatus: 'idle',
  markReadStatus: 'idle',
  markAllReadStatus: 'idle',
};

// Async thunks
export const fetchNotificationsAsync = createAsyncThunk(
  'notifications/fetchNotifications',
  async (isRead: boolean, thunkAPI) => {
    try {
      return await fetchNotifications(isRead);
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

export const getNotificationByIdAsync = createAsyncThunk(
  'notifications/getNotificationById',
  async (id: string, thunkAPI) => {
    try {
      return await getNotificationById(id);
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

export const deleteNotificationAsync = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId: string, thunkAPI) => {
    try {
      await deleteNotification(notificationId);
      return notificationId; // Return the deleted notification id
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

export const markNotificationAsReadAsync = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (notificationId: string, thunkAPI) => {
    try {
      const result = await markNotificationAsRead(notificationId);
      return { notificationId, result };
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

export const markAllNotificationsAsReadAsync = createAsyncThunk(
  'notifications/markAllNotificationsAsRead',
  async (_, thunkAPI) => {
    try {
      return await markAllNotificationsAsRead();
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

export const getUnreadNotificationCountAsync = createAsyncThunk(
  'notifications/getUnreadNotificationCount',
  async (_, thunkAPI) => {
    try {
      return await getUnreadNotificationCount();
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

export const getUnreadNotificationsAsync = createAsyncThunk(
  'notifications/getUnreadNotifications',
  async (_, thunkAPI) => {
    try {
      return await getUnreadNotifications();
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
      state.fetchStatus = 'idle';
      state.deleteStatus = 'idle';
      state.markReadStatus = 'idle';
      state.markAllReadStatus = 'idle';
      state.notifications = [];
      state.unreadNotifications = [];
      state.selectedNotification = null;
      state.unreadCount = 0;
    },
    resetStatuses: (state) => {
      state.fetchStatus = 'idle';
      state.deleteStatus = 'idle';
      state.markReadStatus = 'idle';
      state.markAllReadStatus = 'idle';
      state.error = null;
    },
    setSelectedNotification: (state, action) => {
      state.selectedNotification = action.payload;
    },
    clearSelectedNotification: (state) => {
      state.selectedNotification = null;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
        state.unreadNotifications.unshift(action.payload);
      }
    },
    updateNotification: (state, action) => {
      const index = state.notifications.findIndex(n => n.notificationId === action.payload.notificationId);
      if (index !== -1) {
        state.notifications[index] = action.payload;
      }
      
      const unreadIndex = state.unreadNotifications.findIndex(n => n.notificationId === action.payload.notificationId);
      if (unreadIndex !== -1) {
        if (action.payload.isRead) {
          state.unreadNotifications.splice(unreadIndex, 1);
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        } else {
          state.unreadNotifications[unreadIndex] = action.payload;
        }
      }
    },
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(n => n.notificationId !== notificationId);
      state.unreadNotifications = state.unreadNotifications.filter(n => n.notificationId !== notificationId);
      if (state.selectedNotification?.notificationId === notificationId) {
        state.selectedNotification = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotificationsAsync.pending, (state) => {
        state.loading = true;
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchStatus = 'success';
        state.notifications = Array.isArray(action.payload) ? action.payload : action.payload.notifications || [];
        state.error = null;
      })
      .addCase(fetchNotificationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.fetchStatus = 'error';
        state.error = action.payload as string;
      })
      
      // Get notification by ID
      .addCase(getNotificationByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotificationByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNotification = action.payload;
        state.error = null;
      })
      .addCase(getNotificationByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete notification
      .addCase(deleteNotificationAsync.pending, (state) => {
        state.deleteStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteNotificationAsync.fulfilled, (state, action) => {
        state.deleteStatus = 'success';
        const deletedId = action.payload;
        state.notifications = state.notifications.filter(n => n.notificationId !== deletedId);
        state.unreadNotifications = state.unreadNotifications.filter(n => n.notificationId !== deletedId);
        if (state.selectedNotification?.notificationId === deletedId) {
          state.selectedNotification = null;
        }
        state.error = null;
      })
      .addCase(deleteNotificationAsync.rejected, (state, action) => {
        state.deleteStatus = 'error';
        state.error = action.payload as string;
      })
      
      // Mark notification as read
      .addCase(markNotificationAsReadAsync.pending, (state) => {
        state.markReadStatus = 'loading';
        state.error = null;
      })
      .addCase(markNotificationAsReadAsync.fulfilled, (state, action) => {
        state.markReadStatus = 'success';
        const { notificationId } = action.payload;
        const notification = state.notifications.find(n => n.notificationId === notificationId);
        if (notification) {
          notification.isRead = true;
        }
        state.unreadNotifications = state.unreadNotifications.filter(n => n.notificationId !== notificationId);
        state.unreadCount = Math.max(0, state.unreadCount - 1);
        state.error = null;
      })
      .addCase(markNotificationAsReadAsync.rejected, (state, action) => {
        state.markReadStatus = 'error';
        state.error = action.payload as string;
      })
      
      // Mark all notifications as read
      .addCase(markAllNotificationsAsReadAsync.pending, (state) => {
        state.markAllReadStatus = 'loading';
        state.error = null;
      })
      .addCase(markAllNotificationsAsReadAsync.fulfilled, (state) => {
        state.markAllReadStatus = 'success';
        state.notifications.forEach(n => n.isRead = true);
        state.unreadNotifications = [];
        state.unreadCount = 0;
        state.error = null;
      })
      .addCase(markAllNotificationsAsReadAsync.rejected, (state, action) => {
        state.markAllReadStatus = 'error';
        state.error = action.payload as string;
      })
      
      // Get unread notification count
      .addCase(getUnreadNotificationCountAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnreadNotificationCountAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.unreadCount = action.payload;
        state.error = null;
      })
      .addCase(getUnreadNotificationCountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get unread notifications
      .addCase(getUnreadNotificationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnreadNotificationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.unreadNotifications = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(getUnreadNotificationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  resetNotificationState,
  resetStatuses,
  setSelectedNotification,
  clearSelectedNotification,
  addNotification,
  updateNotification,
  removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
