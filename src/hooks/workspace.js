import axios from 'axios';

export const getWorkspace = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/workspace/byId', data);
  return response;
};

export const getWorkspaceClient = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/workspace/byClient', data);
  return response;
};

export const updateWorkspace = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/workspace/update', data.variables);
  return response;
};

export const iconWorkspace = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/workspace/icon', data.variables);
  return response;
};

export const updateSettings = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/workspace/settings', data.variables);
  return response;
};
export const createWorkspace = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/workspace/create', data.variables);
  return response;
};
