// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports

import { dispatch } from '../index';
import {
  addColumn as addColumnAPI,
  editColumn as editColumnAPI,
  updateColumnOrder as updateColumnOrderAPI,
  deleteColumn as deleteColumnAPI,
  addItem as addItemAPI,
  editItem as editItemAPI,
  updateColumnItemOrder as updateColumnItemOrderAPI,
  selectItem as selectItemAPI,
  addItemComment as addItemCommentAPI,
  deleteItem as deleteItemAPI,
  addStory as addStoryAPI,
  editStory as editStoryAPI,
  updateStoryOrder as updateStoryOrderAPI,
  updateStoryItemOrder as updateStoryItemOrderAPI,
  addStoryComment as addStoryCommentAPI,
  deleteStory as deleteStoryAPI,
  getColumns as getColumnsAPI,
  getColumnsOrder as getColumnsOrderAPI,
  getComments as getCommentsAPI,
  getProfiles as getProfilesAPI,
  getItems as getItemsAPI,
  getUserStory as getUserStoryAPI,
  getUserStoryOrder as getUserStoryOrderAPI
} from 'hooks/kanban';

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  columns: [],
  columnsOrder: [],
  comments: [],
  items: [],
  profiles: [],
  selectedItem: false,
  userStory: [],
  userStoryOrder: []
};

const slice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // ADD COLUMN
    addColumnSuccess(state, action) {
      state.columns = action.payload.columns;
      state.columnsOrder = action.payload.columnsOrder;
    },

    // EDIT COLUMN
    editColumnSuccess(state, action) {
      state.columns = action.payload.columns;
    },

    // UPDATE COLUMN ORDER
    updateColumnOrderSuccess(state, action) {
      state.columnsOrder = action.payload.columnsOrder;
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      state.columns = action.payload.columns;
      state.columnsOrder = action.payload.columnsOrder;
    },

    // ADD ITEM
    addItemSuccess(state, action) {
      state.items = action.payload.items;
      state.columns = action.payload.columns;
      state.userStory = action.payload.userStory;
    },

    // EDIT ITEM
    editItemSuccess(state, action) {
      state.items = action.payload.items;
      state.columns = action.payload.columns;
      state.userStory = action.payload.userStory;
    },

    // UPDATE COLUMN ITEM ORDER
    updateColumnItemOrderSuccess(state, action) {
      state.columns = action.payload.columns;
    },

    // SELECT ITEM
    selectItemSuccess(state, action) {
      state.selectedItem = action.payload.selectedItem;
    },

    // ADD ITEM COMMENT
    addItemCommentSuccess(state, action) {
      state.items = action.payload.items;
      state.comments = action.payload.comments;
    },

    // DELETE ITEM
    deleteItemSuccess(state, action) {
      state.items = action.payload.items;
      state.columns = action.payload.columns;
      state.userStory = action.payload.userStory;
    },

    // ADD STORY
    addStorySuccess(state, action) {
      state.userStory = action.payload.userStory;
      state.userStoryOrder = action.payload.userStoryOrder;
    },

    // EDIT STORY
    editStorySuccess(state, action) {
      state.userStory = action.payload.userStory;
    },

    // UPDATE STORY ORDER
    updateStoryOrderSuccess(state, action) {
      state.userStoryOrder = action.payload.userStoryOrder;
    },

    // UPDATE STORY ITEM ORDER
    updateStoryItemOrderSuccess(state, action) {
      state.userStory = action.payload.userStory;
    },

    // ADD STORY COMMENT
    addStoryCommentSuccess(state, action) {
      state.userStory = action.payload.userStory;
      state.comments = action.payload.comments;
    },

    // DELETE STORY
    deleteStorySuccess(state, action) {
      state.userStory = action.payload.userStory;
      state.userStoryOrder = action.payload.userStoryOrder;
    },

    // GET COLUMNS
    getColumnsSuccess(state, action) {
      state.columns = action.payload;
    },

    // GET COLUMNS ORDER
    getColumnsOrderSuccess(state, action) {
      state.columnsOrder = action.payload;
    },

    // GET COMMENTS
    getCommentsSuccess(state, action) {
      state.comments = action.payload;
    },

    // GET PROFILES
    getProfilesSuccess(state, action) {
      state.profiles = action.payload;
    },

    // GET ITEMS
    getItemsSuccess(state, action) {
      state.items = action.payload;
    },

    // GET USER STORY
    getUserStorySuccess(state, action) {
      state.userStory = action.payload;
    },

    // GET USER STORY ORDER
    getUserStoryOrderSuccess(state, action) {
      state.userStoryOrder = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getColumns() {
  return async () => {
    try {
      const response = await getColumnsAPI();
      dispatch(slice.actions.getColumnsSuccess(response.data.columns));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getColumnsOrder() {
  return async () => {
    try {
      const response = await getColumnsOrderAPI();
      dispatch(slice.actions.getColumnsOrderSuccess(response.data.columnsOrder));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getComments() {
  return async () => {
    try {
      const response = await getCommentsAPI();
      dispatch(slice.actions.getCommentsSuccess(response.data.comments));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProfiles() {
  return async () => {
    try {
      const response = await getProfilesAPI();
      dispatch(slice.actions.getProfilesSuccess(response.data.profiles));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getItems() {
  return async () => {
    try {
      const response = await getItemsAPI();
      dispatch(slice.actions.getItemsSuccess(response.data.items));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserStory() {
  return async () => {
    try {
      const response = await getUserStoryAPI();
      dispatch(slice.actions.getUserStorySuccess(response.data.userStory));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserStoryOrder() {
  return async () => {
    try {
      const response = await getUserStoryOrderAPI();
      dispatch(slice.actions.getUserStoryOrderSuccess(response.data.userStoryOrder));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addColumn(column, columns, columnsOrder) {
  return async () => {
    try {
      const response = await addColumnAPI({ column, columns, columnsOrder });
      dispatch(slice.actions.addColumnSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editColumn(column, columns) {
  return async () => {
    try {
      const response = await editColumnAPI({ column, columns });
      dispatch(slice.actions.editColumnSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateColumnOrder(columnsOrder) {
  return async () => {
    try {
      const response = await updateColumnOrderAPI({ columnsOrder });
      dispatch(slice.actions.updateColumnOrderSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteColumn(columnId, columnsOrder, columns) {
  return async () => {
    try {
      const response = await deleteColumnAPI({ columnId, columnsOrder, columns });
      dispatch(slice.actions.deleteColumnSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addItem(columnId, columns, item, items, storyId, userStory) {
  return async () => {
    try {
      const response = await addItemAPI({ columnId, columns, item, items, storyId, userStory });
      dispatch(slice.actions.addItemSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editItem(columnId, columns, item, items, storyId, userStory) {
  return async () => {
    try {
      const response = await editItemAPI({ items, item, userStory, storyId, columns, columnId });
      dispatch(slice.actions.editItemSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateColumnItemOrder(columns) {
  return async () => {
    try {
      const response = await updateColumnItemOrderAPI({ columns });
      dispatch(slice.actions.updateColumnItemOrderSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function selectItem(selectedItem) {
  return async () => {
    try {
      const response = await selectItemAPI({ selectedItem });
      dispatch(slice.actions.selectItemSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addItemComment(itemId, comment, items, comments) {
  return async () => {
    try {
      const response = await addItemCommentAPI({ items, itemId, comment, comments });
      dispatch(slice.actions.addItemCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteItem(itemId, items, columns, userStory) {
  return async () => {
    try {
      const response = await deleteItemAPI({ columns, itemId, userStory, items });
      dispatch(slice.actions.deleteItemSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addStory(story, userStory, userStoryOrder) {
  return async () => {
    try {
      const response = await addStoryAPI({ userStory, story, userStoryOrder });
      dispatch(slice.actions.addStorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editStory(story, userStory) {
  return async () => {
    try {
      const response = await editStoryAPI({ userStory, story });
      dispatch(slice.actions.editStorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStoryOrder(userStoryOrder) {
  return async () => {
    try {
      const response = await updateStoryOrderAPI({ userStoryOrder });
      dispatch(slice.actions.updateStoryOrderSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStoryItemOrder(userStory) {
  return async () => {
    try {
      const response = await updateStoryItemOrderAPI({ userStory });
      dispatch(slice.actions.updateStoryItemOrderSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addStoryComment(storyId, comment, comments, userStory) {
  return async () => {
    try {
      const response = await addStoryCommentAPI({ userStory, storyId, comment, comments });
      dispatch(slice.actions.addStoryCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteStory(storyId, userStory, userStoryOrder) {
  return async () => {
    try {
      const response = await deleteStoryAPI({ userStory, storyId, userStoryOrder });
      dispatch(slice.actions.deleteStorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
