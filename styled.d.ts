import 'styled-components';
import { ColorsTypes, DevicesTypes } from './src/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    devices: DevicesTypes;
  }
}
