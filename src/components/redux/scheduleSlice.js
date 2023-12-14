import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchConference = createAsyncThunk('schedule/fetchConference', async (id) => {
  const response = await axios.get(`${BASE_URL}/conferences/${id}`);
  return response.data;
});


export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (id) => {
  const response = await axios.get(`${BASE_URL}/schedule/view-all/${id}`);
  return response.data;
});


export const postSchedule = createAsyncThunk('schedule/postSchedule', async ({ id, data, editing, refId }) => {
  if (editing) {
    await axios.put(`${BASE_URL}/schedule/${id}/${refId}`, data);
  } else {
    await axios.post(`${BASE_URL}/schedule/${id}`, data);
  }

  const updatedScheduleResponse = await axios.get(`${BASE_URL}/schedule/view-all/${id}`);
  return updatedScheduleResponse.data;
});


export const deleteSchedule = createAsyncThunk('schedule/deleteSchedule', async ({ conferenceId, scheduleId }) => {
  await axios.delete(`${BASE_URL}/schedule/${conferenceId}/${scheduleId}`);

  const updatedScheduleResponse = await axios.get(`${BASE_URL}/schedule/view-all/${conferenceId}`);
  return updatedScheduleResponse.data;
});


const initialState = {
  conference: null,
  schedule: null,
  error: null,
};


const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   
    builder.addCase(fetchConference.fulfilled, (state, action) => {
      state.conference = action.payload;
    });

   
    builder.addCase(fetchSchedule.fulfilled, (state, action) => {
      state.schedule = action.payload;
    });

  
    builder.addCase(postSchedule.fulfilled, (state, action) => {
      state.schedule = action.payload;
    });

   
    builder.addCase(deleteSchedule.fulfilled, (state, action) => {
      state.schedule = action.payload;
    });

   
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.error = action.error.message;
      }
    );
  },
});

export default scheduleSlice.reducer;
