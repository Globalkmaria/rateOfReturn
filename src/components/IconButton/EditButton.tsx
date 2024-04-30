import IconButton from './IconButton';

interface Props {
  isLock: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const EditButton = ({ isLock, ...resProps }: Props) => {
  const icon = isLock ? 'edit' : 'save';
  return <IconButton icon={icon} {...resProps} />;
};
