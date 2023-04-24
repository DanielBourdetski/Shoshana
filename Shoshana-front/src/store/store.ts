import { configureStore } from '@reduxjs/toolkit'
import generalSlice from './generalSlice'

const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
  },
})

export const generalActions = generalSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;