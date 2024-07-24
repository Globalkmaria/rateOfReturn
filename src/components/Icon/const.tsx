import { FaSave, FaLock, FaLockOpen, FaPlus, FaMinus } from 'react-icons/fa';
import { FiFolderPlus, FiFolderMinus, FiSettings } from 'react-icons/fi';
import {
  MdDeleteOutline,
  MdOutlinePriceChange,
  MdOutlineEdit,
} from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsDatabaseAdd } from 'react-icons/bs';

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
  'folderAdd',
  'folderDelete',
  'priceChange',
  'sampleData',
] as const;

export type IconButtonType = (typeof ICON_NAMES)[number];

export const ICONS: {
  [key in IconButtonType]: JSX.Element;
} = {
  edit: <MdOutlineEdit />,
  save: <FaSave />,
  lock: <FaLock />,
  unlock: <FaLockOpen />,
  delete: <MdDeleteOutline />,
  setting: <FiSettings />,
  close: <CgClose />,
  more: <IoEllipsisVertical />,
  add: <FaPlus />,
  remove: <FaMinus />,
  folderAdd: <FiFolderPlus />,
  folderDelete: <FiFolderMinus />,
  priceChange: <MdOutlinePriceChange />,
  sampleData: <BsDatabaseAdd />,
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
  folderAdd: 'Add folder',
  folderDelete: 'Delete folder',
  priceChange: 'Change price',
  sampleData: 'Import sample data',
};
