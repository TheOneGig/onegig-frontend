import axios from 'axios';

export const getMessages = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/messages', data);
  return response;
};

export const createClientMessage = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/newmessage', data.variables);
  return response;
};

export const getClientMessages = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/client-messages', data);
  return response;
};

export const createMessage = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/client-newmessage', data.variables);
  return response;
};
