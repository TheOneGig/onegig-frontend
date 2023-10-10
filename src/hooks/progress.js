import axios from 'axios';

export const getProgress = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/progress/project', data);
  return response;
};

export const createProcess = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/process/create', data.variables);
  return response;
};

export const updateProcess = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/process/update', data.variables);
  return response;
};

export const deleteProcess = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/process/delete', data.variables);
  return response;
};
