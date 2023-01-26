import axios from 'axios';

export const getGigs = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/user', data);
  return response;
};

export const createGig = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/create', data.variables);
  return response;
};

export const updatePublishGig = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/updatePublish', data.variables);
  return response;
};
