import axios from 'axios';

export const getPayment = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/stripe/byId', data);
  return response;
};

export const createPayment = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/stripe/create', data.variables);
  return response;
};

export const createInvoice = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/stripe/createInvoice', data.variables);
  return response;
};
