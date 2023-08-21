import { DefaultTheme } from 'styled-components';

const colors = {
  greyBackground: '#f8f9fa',
  subtitle: '#868e96',

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

  cyan900: '#0b7285',
  cyan800: '#0c8599',
  cyan700: '#1098ad',
  cyan600: '#15aabf',
  cyan500: '#22b8cf',
  cyan400: '#3bc9db',
  cyan300: '#66d9e8',
  cyan200: '#99e9f2',
  cyan100: '#c5f6fa',
  cyan000: '#e3fafc',

  indigo900: '#364fc7',
  indigo800: '#3b5bdb',
  indigo700: '#4263eb',
  indigo600: '#4c6ef5',
  indigo500: '#5c7cfa',
  indigo400: '#748ffc',
  indigo300: '#91a7ff',
  indigo200: '#bac8ff',
  indigo100: '#dbe4ff',
  indigo000: '#edf2ff',

  violet900: '#5f3dc4',
  violet800: '#6741d9',
  violet700: '#7048e8',
  violet600: '#7950f2',
  violet500: '#845ef7',
  violet400: '#9775fa',
  violet300: '#b197fc',
  violet200: '#d0bfff',
  violet100: '#e5dbff',
  violet000: '#f3f0ff',

  teal900: '#087f5b',
  teal800: '#099268',
  teal700: '#0ca678',
  teal600: '#12b886',
  teal500: '#20c997',
  teal400: '#38d9a9',
  teal300: '#63e6be',
  teal200: '#96f2d7',
  teal100: '#c3fae8',
  teal000: '#e6fcf5',

  blue900: '#1864ab',
  blue800: '#1971c2',
  blue700: '#1c7ed6',
  blue600: '#868e96',
  blue500: '#339af0',
  blue400: '#4dabf7',
  blue300: '#74c0fc',
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

const devices = {
  mobileS: `(max-width: 360px)`,
  mobile: `(max-width: 576px)`,
  tablet: `(max-width: 768px)`,
};

export type ColorsTypes = typeof colors;
export type DevicesTypes = typeof devices;

export const theme: DefaultTheme = {
  colors,
  devices,
};
