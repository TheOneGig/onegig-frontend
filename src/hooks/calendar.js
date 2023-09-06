import axios from 'axios';

export const getEvent = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/calendar/byId', data);
  return response;
};

export const getAllEvents = async (data) => {
  const { data: response } = await axios.get('https://one-gig.herokuapp.com/api/calendar/all', data);
  return response;
};

export const getEvents = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/calendar/user', data);
  return response;
};

export const getWorkspaceEvents = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/calendar/byWorkspace', data);
  return response;
};

export const createEvent = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/calendar/create', data.variables);
  return response;
};

export const deleteEvent = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/calendar/delete', data.variables);
  return response;
};

export const updateEvent = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/calendar/update', data.variables);
  return response;
};
