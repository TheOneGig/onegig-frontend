// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import chat from './chat';
import calendar from './calendar';
import menu from './menu';
import snackbar from './snackbar';
import productReducer from './product';
import cartReducer from './cart';
import kanban from './kanban';
import stopwatchReducer from './stopwatchSlice';


// ==============================|| COMBINE REDUCERS ||============================== //

// Define a key for the stopwatchReducer
const stopwatchPersistConfig = {
  key: 'stopwatch', // Specify a unique key for the stopwatch slice
  storage,
  keyPrefix: 'mantis-ts-', // You can adjust this as needed
};


const reducers = combineReducers({
  chat,
  calendar,
  menu,
  snackbar,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    cartReducer
  ),
  product: productReducer,
  kanban,
  stopwatch: persistReducer(stopwatchPersistConfig, stopwatchReducer), // Add the stopwatchReducer with its own persistence config
});

export default reducers;
