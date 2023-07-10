import axios from 'axios';
                          
export const getNote= async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notes/byId', data);
  return response;
};

export const getAllNotes = async (data) => {
  const { data: response } = await axios.get('https://one-gig.herokuapp.com/api/notes/all', data);
  return response;
};

export const getNotes = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notes/user', data);
  return response;
};

export const createNote = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notes/create', data.variables);
  return response;
};

export const deleteNote = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notes/delete', data.variables);
  return response;
};

export const updateNote = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/notes/update', data.variables);
  return response;
};
