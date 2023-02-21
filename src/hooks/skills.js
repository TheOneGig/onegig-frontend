import axios from 'axios';

export const getAllSkills = async (data) => {
  const { data: response } = await axios.get('https://one-gig.herokuapp.com/api/skills/all', data);
  return response;
};

export const createSkill = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/skills/create', data.variables);
  return response;
};

export const updateSkill = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/skills/update', data.variables);
  return response;
};

export const deleteSkill = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/skills/delete', data.variables);
  return response;
};

export const addSkill = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/skills/add', data.variables);
  return response;
};

export const removeSkill = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/skills/remove', data.variables);
  return response;
};
