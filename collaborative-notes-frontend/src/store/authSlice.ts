import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string };
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    setToken(state, action: PayloadAction<string>) {
      localStorage.setItem('token', action.payload);
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;
