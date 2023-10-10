import axios from 'axios';

export const getReport = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/reports/byId', data);
  return response;
};

export const getAllReports = async (data) => {
  const { data: response } = await axios.get('https://one-gig.herokuapp.com/api/reports/all', data);
  return response;
};

export const getReports = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/reports/user', data);
  return response;
};

export const createReport = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/reports/create', data.variables);
  return response;
};

export const updatePublishReport = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/gigs/updatePublish', data.variables);
  return response;
};

export const deleteReport = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/reports/delete', data.variables);
  return response;
};

export const updateReport = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/reports/updateReport', data.variables);
  return response;
};
