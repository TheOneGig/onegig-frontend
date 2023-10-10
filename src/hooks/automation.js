import axios from 'axios';

export const getAutomation = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/automation/byId', data);
  return response;
};

export const getAutomationClient = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/automation/byClient', data);
  return response;
};

export const getAutomationWorkspace = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/automation/byWorkspace', data);
  return response;
};

export const createAutomation = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/automation/create', data.variables);
  return response;
};
