import { LinkProps } from 'react-router-dom';

import { BUTTON_COLORS, ContainedButtonProps } from '../Button';

export interface BaseAnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    LinkProps {
  disabled?: boolean;
  color?: keyof typeof BUTTON_COLORS;
  selected?: boolean;
}

export type ContainedAnchorProps = BaseAnchorProps &
  Pick<ContainedButtonProps, 'mode'>;
