import axios from 'axios';

export const getNotifications = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/user', data);
  return response;
};

export const getClientNotifications = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/client', data);
  return response;
};

export const getWorkspaceNotifications = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/byWorkspace', data);
  return response;
};

export const createNotification = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/create', data.variables);
  return response;
};

export const createClientNotification = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/client-create', data.variables);
  return response;
};

export const readNotification = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/read', data.variables);
  return response;
};

export const deleteNotification = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/delete', data.variables);
  return response;
};

export const markAllAsRead = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/markAllAsRead', data);
  return response;
};

export const getUnreadCount = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/unreadCount', data);
  return response.unreadCount;
};

export const markAllAsReadClient = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/client-markAllAsRead', data);
  return response;
};

export const getUnreadCountClient = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/client-unreadCount', data);
  return response.unreadCount;
};
