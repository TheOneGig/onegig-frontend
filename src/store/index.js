// third-party
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
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
      }
    }
});

const persister = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, dispatch, persister, useSelector, useDispatch };
