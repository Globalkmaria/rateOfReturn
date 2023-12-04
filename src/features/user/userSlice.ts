import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from './type';

export const userInitialState: User = {
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetUser: () => userInitialState,
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { resetUser, setUsername } = userSlice.actions;

export default userSlice.reducer;
