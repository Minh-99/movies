import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authSlice'
import commonReducer from './reducer/commonSlice'
import homeReducer from './reducer/homeSlice'

const getDefaultMiddleware = (store: any) => (next: any) => (action: any) => {
  let result
  console.groupCollapsed('dispatching', action.type)
  console.log('prev state: ', store.getState())
  console.log('action: ', action)
  result = next(action)
  console.log('next state: ', store.getState())
  console.groupEnd()
  return result
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
    home: homeReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
