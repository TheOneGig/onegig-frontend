import axios from 'axios';

export const getUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/byId', data);
  return response;
};

export const loginUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/login', data);
  console.log(response, "this is the response");
  console.log(data)
  return response;
};

export const createUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/signup', data.variables);
  return response;
};

export const createTeamUser = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/user-signup', data.variables);
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

export const updateSettings = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/settings', data.variables);
  return response;
};


export const getMembers = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/users/byWorkspace', data);
  return response;
};