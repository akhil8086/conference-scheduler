import { configureStore } from '@reduxjs/toolkit';
import conferenceReducer from './conferenceSlice';
// import scheduleReducer from './reducers/scheduleReducer';

const store = configureStore({
  reducer: {
    conferences: conferenceReducer,
    // schedule: scheduleReducer,
  },
});

export default store;