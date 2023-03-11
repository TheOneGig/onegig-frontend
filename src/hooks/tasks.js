import axios from 'axios';

export const getTasks = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/project', data);
  return response;
};

export const createTaskTable = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/createTable', data.variables);
  return response;
};

export const updateTaskTable = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/updateTable', data.variables);
  return response;
};

export const createTask = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/create', data.variables);
  return response;
};

export const updateTask = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/update', data.variables);
  return response;
};

export const updateDoneTask = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/updateDone', data.variables);
  return response;
};

export const deleteTaskTable = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/deleteTable', data.variables);
  return response;
};

export const deleteTask = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/delete', data.variables);
  return response;
};

export const getToDo = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/getToDo', data);
  return response;
};

export const createToDo = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/tasks/createToDo', data.variables);
  return response;
};
