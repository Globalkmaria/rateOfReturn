import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from './type';

export const USER_INITIAL_STATE: User = {
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    resetUser: () => USER_INITIAL_STATE,
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { resetUser, setUsername } = userSlice.actions;

export default userSlice.reducer;
