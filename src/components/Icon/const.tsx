import {
  FaEdit,
  FaSave,
  FaLock,
  FaLockOpen,
  FaTrash,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { CgClose } from 'react-icons/cg';
import { IoEllipsisVertical } from 'react-icons/io5';

const ICON_NAMES = [
  'edit',
  'save',
  'lock',
  'unlock',
  'delete',
  'setting',
  'close',
  'more',
  'add',
  'remove',
] as const;

export type IconButtonType = (typeof ICON_NAMES)[number];

export const ICONS: {
  [key in IconButtonType]: JSX.Element;
} = {
  edit: <FaEdit />,
  save: <FaSave />,
  lock: <FaLock />,
  unlock: <FaLockOpen />,
  delete: <FaTrash />,
  setting: <IoMdSettings />,
  close: <CgClose />,
  more: <IoEllipsisVertical />,
  add: <FaPlus />,
  remove: <FaMinus />,
};

export const ICON_TITLES: { [key in IconButtonType]: string } = {
  edit: 'Edit',
  save: 'Save',
  lock: 'Lock',
  unlock: 'Unlock',
  delete: 'Delete',
  setting: 'Setting',
  close: 'Close',
  more: 'More',
  add: 'Add',
  remove: 'Remove',
};
