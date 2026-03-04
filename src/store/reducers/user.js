import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
  },
  reducers: {
    setUserName(state, action) {
      const { username, password } = action.payload;
      state.username = username;
      state.password = password;
    },
    clearUserInfo(state) {
      state.username = '';
      state.password = '';
    },
  },
});

export const { setUserName, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
