import { LanguageState } from './type';

export const selectCurrentLanguage = (state: { language: LanguageState }) =>
  state.language.currentLanguage;
