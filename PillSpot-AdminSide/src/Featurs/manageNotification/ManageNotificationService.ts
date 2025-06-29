import axiosInstance from '../../axiosInstance';

export const getNotificationsForUser = async (username: string) => {
  const response = await axiosInstance.get(`/api/Notification/user/${username}`);
  return response.data;
};

export const getUnreadNotificationCount = async (username: string) => {
  const response = await axiosInstance.get(`/api/Notification/user/${username}/unread/count`);
  return response.data;
};

export const getUnreadNotifications = async (username: string) => {
  const response = await axiosInstance.get(`/api/Notification/user/${username}/unread`);
  return response.data;
};

export const sendNotificationByUsername = async (notificationData: {
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
}) => {
  const response = await axiosInstance.post('/api/Notification/send-by-username', notificationData);
  return response.data;
};
