import axios from 'axios';

export const getProjects = async (data) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/projects/user', data);
  return response;
};
