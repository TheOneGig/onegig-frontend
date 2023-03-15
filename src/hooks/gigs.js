import axios from 'axios';

export const getGig = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/byId', data);
  return response;
};

export const getAllGigs = async (data) => {
  const { data: response } = await axios.get('https://one-gig.herokuapp.com/api/gigs/all', data);
  return response;
};

export const getGigs = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/user', data);
  return response;
};

export const createGig = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/create', data.variables);
  return response;
};

export const updateGig = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/update', data.variables);
  return response;
};

export const updatePublishGig = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/updatePublish', data.variables);
  return response;
};

export const deleteGig = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/delete', data.variables);
  return response;
};

export const createLead = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/lead', data.variables);
  return response;
};

export const deleteLead = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/deleteLead', data.variables);
  return response;
};
