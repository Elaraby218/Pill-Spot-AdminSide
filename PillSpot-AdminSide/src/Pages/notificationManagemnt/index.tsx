import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../App/Store';
import {
  fetchNotificationsForUser,
  fetchUnreadNotificationCount,
  fetchUnreadNotifications,
  sendNotification,
  resetNotificationState,
  resetSendStatus,
  Notification
} from '../../Featurs/manageNotification/ManageNotifySlice';
import { toast } from 'sonner';

const ManageNotify = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const [username, setUsername] = useState('');
  const [tab, setTab] = useState<"read" | "unread">("unread");
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    content: '',
    type: 'General',
    data: '',
    actorId: null as string | null,
    relatedEntityId: null as string | null,
    relatedEntityType: null as string | null,
    isBroadcast: true
  });

  const {
    notifications,
    unreadNotifications,
    loading,
    error,
    sendStatus,
    sendError
  } = useSelector((state: RootState) => state.manageNotification);

  // Compute counts
  const unreadCount = Array.isArray(unreadNotifications) ? unreadNotifications.length : 0;
  const readCount = Array.isArray(notifications)
    ? notifications.filter((n: Notification) => n.isRead).length
    : 0;

  // Filtered notifications for tab
  let shownNotifications: Notification[] = [];
  if (tab === "unread") {
    shownNotifications = Array.isArray(unreadNotifications) ? unreadNotifications : [];
  } else if (tab === "read") {
    shownNotifications = Array.isArray(notifications)
      ? notifications.filter((n: Notification) => n.isRead)
      : [];
  }

  const handleFetchData = () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    
    dispatch(fetchNotificationsForUser(username));
    dispatch(fetchUnreadNotificationCount(username));
    dispatch(fetchUnreadNotifications(username));
  };

  const handleSendNotification = () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    if (!notificationData.title.trim() || !notificationData.message.trim() || !notificationData.content.trim()) {
      toast.error('Please fill in title, message, and content');
      return;
    }

    dispatch(sendNotification({
      username,
      ...notificationData
    }));
  };

  const handleReset = () => {
    setUsername("");
    setTab("unread");
    setNotificationData({
      title: "",
      message: "",
      content: "",
      type: "General",
      data: "",
      actorId: null,
      relatedEntityId: null,
      relatedEntityType: null,
      isBroadcast: true,
    });
    dispatch(resetNotificationState());
  };

  React.useEffect(() => {
    if (sendStatus === "success") {
      toast.success("Notification sent successfully!");
      dispatch(resetSendStatus());
      setNotificationData({
        title: "",
        message: "",
        content: "",
        type: "General",
        data: "",
        actorId: null,
        relatedEntityId: null,
        relatedEntityType: null,
        isBroadcast: true,
      });
      // Refresh notifications and unread notifications
      if (username.trim()) {
        dispatch(fetchNotificationsForUser(username));
        dispatch(fetchUnreadNotificationCount(username));
        dispatch(fetchUnreadNotifications(username));
      }
    }
    if (sendStatus === "error") {
      toast.error(sendError || "Failed to send notification");
      dispatch(resetSendStatus());
    }
  }, [sendStatus, sendError, dispatch, username]);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="w-full px-2 md:px-6 py-4 h-[calc(100vh-8rem)]">
      {/* Username Input Section */}
      <div className={`rounded-lg shadow-md p-4 mb-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
      }`}>
        <div className="flex gap-4 items-center flex-col md:flex-row">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username..."
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-[#1A2028] text-white border-gray-700 focus:ring-blue-400' 
                : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
            }`}
          />
          <button
            onClick={handleFetchData}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>
          <button
            onClick={handleReset}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            }`}
          >
            Reset
          </button>
        </div>
      </div>

      {username && (
        <div className="flex flex-col md:flex-row gap-4 w-full h-[calc(100%-5.5rem)] min-h-0">
          {/* Add Notification Section */}
          <div className={`flex-1 min-w-[300px] max-w-md rounded-lg shadow-md p-4 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'
          }`}>
            <div className="text-lg font-semibold mb-2 transition-colors duration-300">
              {theme === 'dark' ? <span className="text-white">Add Notification</span> : <span className="text-gray-800">Add Notification</span>}
            </div>
            <input
              type="text"
              value={notificationData.title}
              onChange={(e) => setNotificationData({...notificationData, title: e.target.value})}
              placeholder="Notification title..."
              className={`w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#1A2028] text-white border-gray-700 focus:ring-blue-400' 
                  : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
              }`}
            />
            <select
              value={notificationData.type}
              onChange={(e) => setNotificationData({...notificationData, type: e.target.value})}
              className={`w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#1A2028] text-white border-gray-700 focus:ring-blue-400' 
                  : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
              }`}
            >
              <option value="General">General</option>
              <option value="Info">Info</option>
              <option value="Success">Success</option>
              <option value="Warning">Warning</option>
              <option value="Error">Error</option>
            </select>
            <textarea
              value={notificationData.message}
              onChange={(e) => setNotificationData({...notificationData, message: e.target.value})}
              placeholder="Notification message..."
              rows={2}
              className={`w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#1A2028] text-white border-gray-700 focus:ring-blue-400' 
                  : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
              }`}
            />
            <textarea
              value={notificationData.content}
              onChange={(e) => setNotificationData({...notificationData, content: e.target.value})}
              placeholder="Notification content..."
              rows={2}
              className={`w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#1A2028] text-white border-gray-700 focus:ring-blue-400' 
                  : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
              }`}
            />
            <input
              type="text"
              value={notificationData.data}
              onChange={(e) => setNotificationData({...notificationData, data: e.target.value})}
              placeholder="Additional data (optional)..."
              className={`w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#1A2028] text-white border-gray-700 focus:ring-blue-400' 
                  : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
              }`}
            />
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="isBroadcast"
                checked={notificationData.isBroadcast}
                onChange={(e) => setNotificationData({...notificationData, isBroadcast: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="isBroadcast" className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Is Broadcast Notification
              </label>
            </div>
            <button
              onClick={handleSendNotification}
              disabled={sendStatus === 'loading'}
              className={`w-full px-6 py-2 rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 ${
                theme === 'dark'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {sendStatus === 'loading' ? 'Sending...' : 'Send Notification'}
            </button>
          </div>

          {/* Tabs and Notification List Section */}
          <div className="flex-1 flex flex-col w-full h-full min-h-0">
            {/* Tabs with counts */}
            <div className="flex gap-2 mb-4">
              <button
                className={`flex-1 py-2 rounded-t-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-300 ${
                  tab === 'read'
                    ? theme === 'dark'
                      ? 'bg-[#232B36] text-white'
                      : 'bg-white text-green-600'
                    : 'bg-transparent text-gray-400'
                }`}
                onClick={() => setTab('read')}
              >
                Read
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  tab === 'read' ? 'bg-green-500 text-white' : theme === 'dark' ? 'bg-[#1A2028] text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>{readCount}</span>
              </button>
              <button
                className={`flex-1 py-2 rounded-t-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-300 ${
                  tab === 'unread'
                    ? theme === 'dark'
                      ? 'bg-[#232B36] text-white'
                      : 'bg-white text-orange-600'
                    : 'bg-transparent text-gray-400'
                }`}
                onClick={() => setTab('unread')}
              >
                Unread
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  tab === 'unread' ? 'bg-orange-500 text-white' : theme === 'dark' ? 'bg-[#1A2028] text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>{unreadCount}</span>
              </button>
            </div>
            {/* Notification List */}
            <div className={`rounded-b-lg shadow-inner p-2 flex-1 min-h-0 overflow-y-auto ${theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'}`}>
              {shownNotifications.map((notification: Notification) => (
                <div key={notification.notificationId} className={`mb-2 p-2 rounded ${theme === 'dark' ? 'bg-[#1A2028] text-white' : 'bg-gray-50 text-gray-800'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{notification.title}</span>
                    <span className={`text-xs ${notification.isRead ? 'text-green-500' : 'text-red-500'}`}>{notification.isRead ? 'Read' : 'Unread'}</span>
                  </div>
                  <div className="text-xs">{notification.message}</div>
                  <div className="text-xs text-gray-400">{notification.content}</div>
                </div>
              ))}
              {shownNotifications.length === 0 && (
                <div className="text-center text-gray-400 py-4">No notifications found.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotify;
