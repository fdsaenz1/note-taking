import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './noteSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        notes: noteReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
