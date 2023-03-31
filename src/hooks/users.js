import axios from 'axios';

export const getUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/byId', data);
  return response;
};

export const loginUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/login', data);
  return response;
};

export const createUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/signup', data.variables);
  return response;
};

export const updateUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/update', data.variables);
  return response;
};

export const avatarUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/avatar', data.variables);
  return response;
};

export const payoutUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/payoutInfo', data.variables);
  return response;
};
