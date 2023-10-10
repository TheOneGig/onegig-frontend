import axios from 'axios';

export const getForm = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/form/automation', data);
  return response;
};


export const createForm = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/form/create', data.variables);
  return response;
};

export const updateForm = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/form/update', data.variables);
  return response;
};

export const deleteForm = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/form/delete', data.variables);
  return response;
};

export const createFormAnswer = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/form/createAnswer', data.variables);
  return response;
};

export const updateFormAnswer = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/form/updateAnswer', data.variables);
  return response;
};