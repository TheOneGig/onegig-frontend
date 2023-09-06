import axios from 'axios';

export const getClientsite = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clientsite/byId', data);
  return response;
};

export const getClientsites = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clientsite/byWorkspace', data);
  return response;
};

// export const updateClientsite = async (data) => {
//   const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clientsite/update', data.variables);
//   return response;
// };

// export const updateSettings = async (data) => {
//   const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/clientsite/settings', data.variables);
//   return response;
// };
