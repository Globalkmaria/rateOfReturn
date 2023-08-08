import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectUser = (state: RootState) => state.user;
export const selectUsername = (state: RootState) => state.user.username;
export const selectIsUserLoggedIn = () =>
  createSelector([selectUsername], (username) => !!username);