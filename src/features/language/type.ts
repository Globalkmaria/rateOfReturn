import { LANGUAGE_LIST } from './const';

export type LanguageType = (typeof LANGUAGE_LIST)[number];
export type LanguageState = {
  currentLanguage: LanguageType;
};

export type LanguagesScriptMap<T> = {
  [key in LanguageType]: T;
};
