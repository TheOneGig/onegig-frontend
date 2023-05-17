import axios from 'axios';

export const getTemplate = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/templates/byId', data);
  return response;
};

export const getAllTemplates = async (data) => {
  const { data: response } = await axios.get('https://one-gig.herokuapp.com/api/templates/all', data); 
  return response;
};

export const getTemplates = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/templates/user', data);
  return response;
};

export const createTemplate = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/templates/create', data.variables);
  return response;
};

export const deleteTemplate = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/templates/delete', data.variables);
  return response;
};

export const updateTemplate = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/templates/updateTemplate', data.variables);
  return response;
}



