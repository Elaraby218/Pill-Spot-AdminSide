import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../App/Store';
import { 
  fetchNotificationsAsync, 
  deleteNotificationAsync, 
  markNotificationAsReadAsync,
  markAllNotificationsAsReadAsync,
  getUnreadNotificationCountAsync,
  getUnreadNotificationsAsync
} from '../Featurs/Notification/notificationSlice';
import { IoIosNotifications, IoIosClose } from 'react-icons/io';
import NotificationCard from './NotificationCard';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.ThemeSlice.theme);
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);
  const loading = useSelector((state: RootState) => state.notifications.loading);
  const deleteStatus = useSelector((state: RootState) => state.notifications.deleteStatus);
  const markReadStatus = useSelector((state: RootState) => state.notifications.markReadStatus);
  const markAllReadStatus = useSelector((state: RootState) => state.notifications.markAllReadStatus);

  const [activeTab, setActiveTab] = useState<'read' | 'unread'>('unread');

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotificationsAsync(false));
      dispatch(getUnreadNotificationCountAsync());
    }
  }, [isOpen, dispatch]);

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await dispatch(deleteNotificationAsync(notificationId));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await dispatch(markNotificationAsReadAsync(notificationId));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await dispatch(markAllNotificationsAsReadAsync());
      dispatch(fetchNotificationsAsync(false));
      dispatch(getUnreadNotificationCountAsync());
      if (activeTab === 'unread') {
        dispatch(getUnreadNotificationsAsync());
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handleTabChange = (tab: 'read' | 'unread') => {
    setActiveTab(tab);
    if (tab === 'unread') {
      dispatch(getUnreadNotificationsAsync());
    } else {
      dispatch(fetchNotificationsAsync(true));
    }
  };

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications.filter(n => n.isRead);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <>
   
      {isOpen && (
        <div 
          className="fixed inset-0  bg-opacity-30 backdrop-blur-xs z-40"
          onClick={onClose}
        />
      )}


      <div className={`fixed top-0 right-0 h-full w-96 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-[#232B36]' : 'bg-white'}`}>
      
          <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2">
              <IoIosNotifications className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Notifications
              </h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700 text-white' : 'text-gray-600'}`}
            >
              <IoIosClose className="text-2xl" />
            </button>
          </div>

    
          <div className={`flex border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => handleTabChange('unread')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'unread'
                  ? theme === 'dark' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => handleTabChange('read')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'read'
                  ? theme === 'dark' ? 'text-green-400 border-b-2 border-green-400' : 'text-green-600 border-b-2 border-green-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Read
            </button>
          </div>

      
          {unreadCount > 0 && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={handleMarkAllAsRead}
                disabled={markAllReadStatus === 'loading'}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  markAllReadStatus === 'loading'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : theme === 'dark' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {markAllReadStatus === 'loading' ? 'Marking...' : 'Mark All as Read'}
              </button>
            </div>
          )}

     
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <IoIosNotifications className={`text-4xl mb-2 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {activeTab === 'unread' ? 'No unread notifications' : 'No notifications'}
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {filteredNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.notificationId}
                    notification={notification}
                    onDelete={handleDeleteNotification}
                    onMarkAsRead={handleMarkAsRead}
                    deleteStatus={deleteStatus}
                    markReadStatus={markReadStatus}
                    theme={theme}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer; 