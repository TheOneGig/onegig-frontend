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

export const updateProject = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/update', data.variables);
  return response;
};

export const archiveProject = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/archive', data.variables);
  return response;
};

export const getMessages = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/messages', data);
  return response;
};

export const createMessage = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/newmessage', data.variables);
  return response;
};

export const addFile = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/addFile', data.variables);
  return response;
};

export const deleteFile = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/deleteFile', data.variables);
  return response;
};
