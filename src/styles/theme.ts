import { DefaultTheme } from 'styled-components';

const colors: { [key: string]: string } = {
  white: '#FFFFFF',
  black: '#000000',

  grey900: '#212529',
  grey800: '#343a40',
  grey700: '#495057',
  grey600: '#868e96',
  grey500: '#adb5bd',
  grey400: '#ced4da',
  grey300: '#dee2e6',
  grey200: '#e9ecef',
  grey100: '#f1f3f5',
  grey000: '#f8f9fa',

  blue900: '#1864ab',
  blue800: '#1971c2',
  blue700: '#1c7ed6',
  blue600: '#868e96',
  blue500: '#339af0',
  blue400: '#4dabf7',
  blue300: '#dee2e6',
  blue200: '#a5d8ff',
  blue100: '#d0ebff',
  blue000: '#e7f5ff',

  yellow900: '#e67700',
  yellow800: '#f08c00',
  yellow700: '#f59f00',
  yellow600: '#fab005',
  yellow500: '#ffd43b',
  yellow400: '#fcc419',
  yellow300: '#ffe066',
  yellow200: '#ffec99',
  yellow100: '#fff3bf',
  yellow000: '#fff9db',

  red900: '#c92a2a',
  red800: '#e03131',
  red700: '#f03e3e',
  red600: '#fa5252',
  red500: '#ff6b6b',
  red400: '#ff8787',
  red300: '#ffa8a8',
  red200: '#ffc9c9',
  red100: '#ffe3e3',
  red000: '#fff5f5',
};

export type ColorsTypes = typeof colors;

export const theme: DefaultTheme = {
  colors,
};
