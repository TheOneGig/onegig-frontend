// third-party
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  projectSelected: ''
};

// ==============================|| SLICE - MENU ||============================== //

const project = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setPoject(state, action) {
      state.projectSelected = action.payload.selectedProject;
    }
  }
});

export default project.reducer;

export const { setProject  } = project.actions;
