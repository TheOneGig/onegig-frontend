import axios from 'axios';

export const getTeam = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/teams/user', data);
  return response;
};

export const getTeambyId = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/teams/byId', data);
  return response;
};

export const getWorkspaceTeam = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/teams/byWorkspace', data);
  return response;
};


export const getAllTeams = async (data) => {
  const { data: response } = await axios.get('https://one-gig.herokuapp.com/api/teams/all', data);
  return response;
};

export const deleteMember = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/teams/delete-member', data);
  return response;
};

export const getMembers = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/teams/members', data);
  return response;
};

export const getMember = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/teams/member', data);
  return response;
};

export const createTeam = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/teams/create', data.variables);
  return response;
};

export const deleteTeam = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/teams/delete', data.variables);
  return response;
};

export const updateTeam = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/teams/update', data.variables);
  return response;
};
