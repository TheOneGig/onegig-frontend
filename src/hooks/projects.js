import axios from 'axios';

export const getProjects = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/user', data);
  return response;
};

export const getProject = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/byId', data);
  return response;
};

export const createProject = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/create', data.variables);
  return response;
};
