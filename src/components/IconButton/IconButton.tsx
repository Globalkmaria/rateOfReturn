import { FaEdit, FaSave, FaLock, FaLockOpen, FaTrash } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { CgClose } from 'react-icons/cg';

import { BorderButton, BorderButtonProps } from '../Button';

const ICON_KEYS = [
  'edit',
  'save',
  'lock',
  'unlock',
  'delete',
  'setting',
  'close',
];

const ICONS: {
  [key in (typeof ICON_KEYS)[number]]: JSX.Element;
} = {
  edit: <FaEdit />,
  save: <FaSave />,
  lock: <FaLock />,
  unlock: <FaLockOpen />,
  delete: <FaTrash />,
  setting: <IoMdSettings />,
  close: <CgClose />,
};

const TITLES: { [key in (typeof ICON_KEYS)[number]]: string } = {
  edit: 'Edit',
  save: 'Save',
  lock: 'Lock',
  unlock: 'Unlock',
  delete: 'Delete',
  setting: 'Setting',
  close: 'Close',
};

type IconButtonType = keyof typeof ICONS;

type IconButtonProps = {
  icon: IconButtonType;
} & BorderButtonProps;

function IconButton({
  icon,
  disabled,
  width = 40,
  ...resProps
}: IconButtonProps) {
  return (
    <BorderButton
      disabled={disabled}
      width={width}
      aria-label={TITLES[icon]}
      title={TITLES[icon]}
      {...resProps}
    >
      {ICONS[icon]}
    </BorderButton>
  );
}

export default IconButton;
