import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LanguageState, LanguageType } from './type';
import { EN } from './const';

const initialState: LanguageState = {
  currentLanguage: EN,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    resetLanguage: () => initialState,
    setLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage, resetLanguage } = languageSlice.actions;
export default languageSlice.reducer;
