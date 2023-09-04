import axios from 'axios';

// Columns
export const getColumns = async () => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/columns');
  return response;
};

export const getColumnsOrder = async () => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/columns-order');
  return response;
};

export const getComments = async () => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/comments');
  return response;
};

export const getProfiles = async () => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/profiles');
  return response;
};

export const getItems = async () => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/items');
  return response;
};

export const getUserStory = async () => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/userstory');
  return response;
};

export const getUserStoryOrder = async () => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/userstory-order');
  return response;
};

export const addColumn = async (column, columns, columnsOrder) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/add-column', { column, columns, columnsOrder });
  return response;
};

export const addItem = async (columnId, columns, item, items, storyId, userStory) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/add-item', {
    columnId,
    columns,
    item,
    items,
    storyId,
    userStory
  });
  return response;
};

export const addItemComment = async (itemId, comment, items, comments) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/add-item-comment', {
    items,
    itemId,
    comment,
    comments
  });
  return response;
};

export const updateStoryOrder = async (userStoryOrder) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/update-story-order', { userStoryOrder });
  return response;
};

export const editColumn = async (columnId, columnData) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/edit-column', { columnId, columnData });
  return response;
};

export const updateColumnOrder = async (columnsOrder) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/update-column-order', { columnsOrder });
  return response;
};

export const deleteColumn = async (columnId) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/delete-column', { columnId });
  return response;
};

export const editItem = async (itemId, itemData) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/edit-item', { itemId, itemData });
  return response;
};

export const updateColumnItemOrder = async (columnId, itemOrder) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/update-column-item-order', { columnId, itemOrder });
  return response;
};

export const selectItem = async (itemId) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/select-item', { itemId });
  return response;
};

export const deleteItem = async (itemId) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/delete-item', { itemId });
  return response;
};

export const addStory = async (storyData) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/add-story', { storyData });
  return response;
};

export const editStory = async (storyId, storyData) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/edit-story', { storyId, storyData });
  return response;
};

export const updateStoryItemOrder = async (storyId, itemOrder) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/update-story-item-order', { storyId, itemOrder });
  return response;
};

export const addStoryComment = async (storyId, comment) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/add-story-comment', { storyId, comment });
  return response;
};

export const deleteStory = async (storyId) => {
  const { data: response } = await axios.post('https://one-gig.herokuapp.com/api/kanban/delete-story', { storyId });
  return response;
};
