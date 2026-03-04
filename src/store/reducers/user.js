import { createSlice } from '@reduxjs/toolkit';

const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('userInfo');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: savedToken || '',
    userInfo: savedUser ? JSON.parse(savedUser) : null,
    isAuthenticated: !!savedToken,
  },
  reducers: {
    loginSuccess(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.userInfo = user;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(user));
    },
    logout(state) {
      state.token = '';
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
