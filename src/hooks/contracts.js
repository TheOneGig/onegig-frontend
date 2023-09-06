import axios from 'axios';

export const getContract = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/contracts/byId', data);
  return response;
};

export const getAllContracts = async (data) => {
  const { data: response } = await axios.get('https://one-gig.herokuapp.com/api/contracts/all', data);
  return response;
};

export const getContracts = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/contracts/user', data);
  return response;
};

export const getClientContracts = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/contracts/byClient', data);
  return response;
};

export const getWorkspaceContracts = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/contracts/byWorkspace', data);
  return response;
};

export const createContract = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/contracts/create', data.variables);
  return response;
};

export const deleteContract = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/contracts/delete', data.variables);
  return response;
};

export const updateContractStatus = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/contracts/updateStatus', data.variables);
  return response;
};
