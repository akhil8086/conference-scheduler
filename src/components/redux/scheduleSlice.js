import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchConference = createAsyncThunk('schedule/fetchConference', async (id) => {
  const response = await axios.get(`http://localhost:8080/conferences/${id}`);
  return response.data;
});


export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (id) => {
  const response = await axios.get(`http://localhost:8080/schedule/view-all/${id}`);
  return response.data;
});


export const postSchedule = createAsyncThunk('schedule/postSchedule', async ({ id, data, editing, refId }) => {
  if (editing) {
    await axios.put(`http://localhost:8080/schedule/${id}/${refId}`, data);
  } else {
    await axios.post(`http://localhost:8080/schedule/${id}`, data);
  }

  const updatedScheduleResponse = await axios.get(`http://localhost:8080/schedule/view-all/${id}`);
  return updatedScheduleResponse.data;
});


export const deleteSchedule = createAsyncThunk('schedule/deleteSchedule', async ({ conferenceId, scheduleId }) => {
  await axios.delete(`http://localhost:8080/schedule/${conferenceId}/${scheduleId}`);

  const updatedScheduleResponse = await axios.get(`http://localhost:8080/schedule/view-all/${conferenceId}`);
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
