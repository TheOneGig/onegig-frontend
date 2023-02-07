import axios from 'axios';

export const getUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/login', data);
  return response;
};

export const createUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/signup', data.variables);
  return response;
};
