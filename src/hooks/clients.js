import axios from 'axios';

export const getClient = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clients/byId', data);
  return response;
};

export const getAllClients = async (data) => {
  const { data: response } = await axios.get('https://one-gig.herokuapp.com/api/clients/all', data);
  return response;
};

export const getClients = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clients/user', data);
  return response;
};

export const createClient = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clients/create', data.variables);
  //  console.log("createContract response:", response)
  return response;
};

export const deleteClient = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clients/delete', data.variables);
  return response;
};

export const updateClient = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clients/update', data.variables);
  return response;
};

export const updateClientStatus = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clients/updateStatus', data.variables);
  return response;
};
