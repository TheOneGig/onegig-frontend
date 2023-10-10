import axios from 'axios';

export const getWelcome = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/automation/automation', data);
  return response;
};

export const createWelcome = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/automation/create', data.variables);
  return response;
};

export const updateWelcome = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/automation/update', data.variables);
  return response;
};

export const deleteWelcome = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/automation/delete', data.variables);
  return response;
};