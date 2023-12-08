import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchConferences = createAsyncThunk('conferences/fetch', async (pageInfo) => {
  const { page, size } = pageInfo;
  const response = await axios.get(`http://localhost:8080/conferences/pageable?page=${page - 1}&size=${size}&sort=conferenceId,desc`);
  return response.data;
});


export const postConference = createAsyncThunk('conferences/post', async (formData) => {
  const response = await axios.post('http://localhost:8080/conferences', formData);
  return response.data;
});


export const updateConference = createAsyncThunk('conferences/update', async ({ id, formData }) => {
  const response = await axios.put(`http://localhost:8080/conferences/update/${id}`, formData);
  return response.data;
});

export const deleteConference = createAsyncThunk('conferences/delete', async (conferenceId) => {
  await axios.delete(`http://localhost:8080/conferences/${conferenceId}`);
  return conferenceId;
});


const conferenceSlice = createSlice({
  name: 'conferences',
  initialState: {
    conferenceData: [],
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConferences.fulfilled, (state, action) => {
        state.conferenceData = action.payload.content;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(postConference.fulfilled, (state) => {
       
      })
      .addCase(updateConference.fulfilled, (state) => {
        
      })
      .addCase(deleteConference.fulfilled, (state, action) => {
        state.conferenceData = state.conferenceData.filter(
          (conference) => conference.conferenceId !== action.payload
        );
      });
  },
});

export default conferenceSlice.reducer;