import axios from 'axios';

export const createRequirement = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/requirements/create', data.variables);
  return response;
};

export const updateRequirement = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/requirements/update', data.variables);
  return response;
};

export const createAnswer = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/requirements/createAnswer', data.variables);
  return response;
};

export const updateAnswer = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/requirements/updateAnswer', data.variables);
  return response;
};

export const deleteRequirement = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/requirements/delete', data.variables);
  return response;
};
