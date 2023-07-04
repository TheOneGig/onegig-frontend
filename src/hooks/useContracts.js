import axios from 'axios';

const API_BASE_URL = 'https://one-gig.herokuapp.com/api/contracts';

export const getAllContracts = async () => {
  const { data: response } = await axios.get(`${API_BASE_URL}/all`);
  return response;
};

export const createContract = async (data) => {
  const { data: response } = await axios.post(`${API_BASE_URL}/create`, data.variables);
  return response;
};

export const updateContract = async (data) => {
  const { data: response } = await axios.post(`${API_BASE_URL}/update`, data.variables);
  return response;
};

export const deleteContract = async (data) => {
  const { data: response } = await axios.post(`${API_BASE_URL}/delete`, data.variables);
  return response;
};

export const uploadContractFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data: response } = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response;
};

export const updateContractSigned = async (data) => {
  const { data: response } = await axios.post(`${API_BASE_URL}/updateSigned`, data.variables);
  return response;
};
