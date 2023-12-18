import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchConferences = createAsyncThunk('conferences/fetch', async (pageInfo) => {
  const { page, size } = pageInfo;
  const response = await axios.get(`${BASE_URL}/conferences/pageable?page=${page - 1}&size=${size}&sort=conferenceId,desc`);
  return response.data;
});


export const postConference = createAsyncThunk('conferences/post', async (formData) => {
  const response = await axios.post(`${BASE_URL}/conferences`, formData);
  return response.data;
});

export const updateConference = createAsyncThunk('conferences/update', async ({ id, formData }) => {
  const response = await axios.put(`${BASE_URL}/conferences/update/${id}`, formData);
  return response.data;
});


export const fetchConferenceById = createAsyncThunk(
  'conferences/fetchById',
  async ({ conferenceId, setFormData, setShowModal }) => {
      const response = await axios.get(`${BASE_URL}/conferences/${conferenceId}`);
      return { data: response.data, setFormData, setShowModal };
  }
);


export const deleteConference = createAsyncThunk('conferences/delete', async (conferenceId) => {
  await axios.delete(`${BASE_URL}/conferences/${conferenceId}`);
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
      .addCase(postConference.fulfilled, () => {
       
      })
      .addCase(updateConference.fulfilled, () => {
        
      })

      .addCase(fetchConferenceById.fulfilled, (state, action) => {
        const { data, setFormData, setShowModal } = action.payload;
        setFormData(data);
        setShowModal(true);
      })
      
      .addCase(deleteConference.fulfilled, (state, action) => {
        state.conferenceData = state.conferenceData.filter(
          (conference) => conference.conferenceId !== action.payload
        );
      });
  },
});

export default conferenceSlice.reducer;


