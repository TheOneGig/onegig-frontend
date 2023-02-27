import axios from 'axios';

export const getNotifications = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/user', data);
  return response;
};

export const createNotification = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/create', data.variables);
  return response;
};

export const readNotification = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notifications/read', data.variables);
  return response;
};
