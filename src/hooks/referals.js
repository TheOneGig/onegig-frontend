import axios from 'axios';


export const getReferalClient = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/referal/client', data);
  return response;
};

export const createReferal = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/referal/create', data.variables);
  return response;
};

export const updateReferal = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/referal/update', data.variables);
  return response;
};
export const deleteReferal = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/referal/delete', data.variables);
  return response;
};