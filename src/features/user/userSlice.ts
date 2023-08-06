import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from './type';

const initialState: User = {
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState,
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { resetUser, setUsername } = userSlice.actions;

export default userSlice.reducer;
