import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type HomeState = {
  listImages: string[]
}

const initialState: HomeState = {
  listImages: [],
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<string[]>) => {
      state.listImages = action.payload
    },
  },
})

export const { setImages } = homeSlice.actions

export default homeSlice.reducer
