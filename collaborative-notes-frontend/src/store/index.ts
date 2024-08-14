import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import your auth slice

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
