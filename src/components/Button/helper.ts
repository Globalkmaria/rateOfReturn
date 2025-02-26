import { ButtonHoverDarker } from './type';

export function getHoverColor(hoverDarker: ButtonHoverDarker) {
  switch (hoverDarker) {
    case 0:
      return '100';
    case 1:
      return '200';
    case 2:
      return '300';
    case 3:
      return '400';
    case 4:
      return '500';
    default:
      return '100';
  }
}
