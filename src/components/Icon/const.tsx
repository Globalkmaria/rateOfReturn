import { FaLock, FaLockOpen, FaRegSave, FaRegFolder } from 'react-icons/fa';
import {
  FiFolderPlus,
  FiFolderMinus,
  FiSettings,
  FiCheck,
} from 'react-icons/fi';
import {
  MdDeleteOutline,
  MdOutlinePriceChange,
  MdOutlineEdit,
  MdArrowDropDown,
} from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { IoEllipsisVertical, IoSearch } from 'react-icons/io5';
import { BsDatabaseAdd } from 'react-icons/bs';
import { MdOutlineOutput } from 'react-icons/md';
import { BiError } from 'react-icons/bi';

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
  'sold',
  'folder',
  'search',
  'error',
  'arrowDown',
  'check',
] as const;

export type IconButtonType = (typeof ICON_NAMES)[number];

export const ICONS: {
  [key in IconButtonType]: JSX.Element;
} = {
  edit: <MdOutlineEdit />,
  save: <FaRegSave />,
  lock: <FaLock />,
  unlock: <FaLockOpen />,
  delete: <MdDeleteOutline />,
  setting: <FiSettings />,
  close: <CgClose />,
  more: <IoEllipsisVertical />,
  add: <IoMdAdd />,
  remove: <IoMdRemove />,
  folderAdd: <FiFolderPlus />,
  folderDelete: <FiFolderMinus />,
  priceChange: <MdOutlinePriceChange />,
  sampleData: <BsDatabaseAdd />,
  sold: <MdOutlineOutput />,
  folder: <FaRegFolder />,
  search: <IoSearch />,
  error: <BiError />,
  arrowDown: <MdArrowDropDown />,
  check: <FiCheck />,
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
  sold: 'Sold',
  folder: 'Folder',
  search: 'Search',
  error: 'Error',
  arrowDown: 'Open',
  check: 'Check',
};
