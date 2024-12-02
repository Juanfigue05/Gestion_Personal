// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState = loadState() || {
  user: null,
  role: null,
  isAuthenticated: false,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      // Guardar en localStorage
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.token = null;
      // Limpiar localStorage
      localStorage.removeItem('authState');
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('authState', JSON.stringify(state));
    }
  }
});

export const { login, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;