import React, { useState } from 'react';
import { Notification } from '../Featurs/Notification/notificationSlice';
import { IoIosTrash, IoIosCheckmark } from 'react-icons/io';

interface NotificationCardProps {
  notification: Notification;
  onDelete: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  deleteStatus: string;
  markReadStatus: string;
  theme: string;
  formatDate: (date: string) => string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onDelete,
  onMarkAsRead,
  deleteStatus,
  markReadStatus,
  theme,
  formatDate
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(notification.notificationId);
    setIsDeleting(false);
  };

  const handleMarkAsRead = async () => {
    setIsMarking(true);
    await onMarkAsRead(notification.notificationId);
    setIsMarking(false);
  };

  return (
    <div className={`p-4 rounded-lg border transition-all ${
      notification.isRead 
        ? theme === 'dark' ? 'bg-[#232B36] border-gray-700' : 'bg-white border-gray-200 shadow-sm'
        : theme === 'dark' ? 'bg-[#1A2028] border-transparent shadow-lg' : 'bg-blue-50 border-transparent shadow-md'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className={`font-semibold text-sm mb-1 ${
            notification.isRead 
              ? theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              : theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {notification.title}
          </h3>
          <p className={`text-xs mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {notification.message}
          </p>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            {formatDate(notification.createdDate)}
          </p>
        </div>
        
        {!notification.isRead && (
          <div className="w-3 h-3 bg-blue-500 rounded-full ml-2 flex-shrink-0 animate-pulse"></div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        {!notification.isRead && (
          <button
            onClick={handleMarkAsRead}
            disabled={isMarking || markReadStatus === 'loading'}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              isMarking || markReadStatus === 'loading'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-md'
            }`}
          >
            <IoIosCheckmark className="text-sm" />
            {isMarking ? 'Marking...' : 'Mark Read'}
          </button>
        )}
        
        <button
          onClick={handleDelete}
          disabled={isDeleting || deleteStatus === 'loading'}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
            isDeleting || deleteStatus === 'loading'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : theme === 'dark'
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
                : 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md'
          }`}
        >
          <IoIosTrash className="text-sm" />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default NotificationCard; 