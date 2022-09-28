import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk(
  'name',
  async (obj, { dispatch, getState }) => {}
)
export const API_ERROR = {
  fetchData,
}
