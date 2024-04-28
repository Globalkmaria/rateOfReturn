import IconButton from './IconButton';

type Props = {
  isLock: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export const LockButton = ({ isLock, ...resProps }: Props) => {
  const icon = isLock ? 'lock' : 'unlock';
  return <IconButton icon={icon} {...resProps} />;
};
