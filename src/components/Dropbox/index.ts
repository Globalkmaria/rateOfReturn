import { default as DropboxContainer } from './Dropbox';
import { DropboxItem } from './DropboxItem';
import { DropboxWrapper } from './DropboxWrapper';

const Dropbox = {
  Wrapper: DropboxWrapper,
  Container: DropboxContainer,
  Item: DropboxItem,
};

export default Dropbox;
export type * from './Dropbox';
