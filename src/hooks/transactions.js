import axios from 'axios';

export const getAllTransactions = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/transactions/all', data);
  return response;
};

export const createTransaction = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/transactions/create', data.variables);
  return response;
};

export const getWorkspaceTransaction = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/transactions/byWorkspace', data);
  return response;
};

export const getTransactions = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/transactions/user', data);
  return response;
};

export const updateTransaction = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/transactions/update', data.variables);
  return response;
};

export const deleteTransaction = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/transactions/delete', data.variables);
  return response;
};
