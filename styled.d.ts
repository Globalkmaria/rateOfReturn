import 'styled-components';
import { ColorsTypes } from './src/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
  }
}
