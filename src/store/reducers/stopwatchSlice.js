import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRunning: false,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    startStopwatch: (state) => {
      state.isRunning = true;
    },
    pauseStopwatch: (state) => {
      state.isRunning = false;
    },
    resetStopwatch: (state) => {
      state.isRunning = false;
      state.hours = 0;
      state.minutes = 0;
      state.seconds = 0;
    },
    updateTime: (state, action) => {
      const { hours, minutes, seconds } = action.payload;
      state.hours = hours;
      state.minutes = minutes;
      state.seconds = seconds;
    },
  },
});

export const {
  startStopwatch,
  pauseStopwatch,
  resetStopwatch,
  updateTime,
} = stopwatchSlice.actions;

export default stopwatchSlice.reducer;
