export type HoverDarker = 0 | 1 | 2 | 3 | 4;

export function getHoverColor(hoverDarker: HoverDarker) {
  return (100 + hoverDarker * 100).toString();
}
