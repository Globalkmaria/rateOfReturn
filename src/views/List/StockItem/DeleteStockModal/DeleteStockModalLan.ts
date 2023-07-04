import { LanguagesScriptMap } from '../../../../features/language/type';
import { DeleteModalProps } from './DeleteStockModal';

type Messages = { [key in DeleteModalProps['type']]: string };

export const MESSAGES_LAN: LanguagesScriptMap<Messages> = {
  KR: {
    stock: 'Are you sure you want to delete this stock?',
    purchase: 'Are you sure you want to delete this item?',
  },
  EN: {
    stock: 'Are you sure you want to delete this stock?',
    purchase: 'Are you sure you want to delete this item?',
  },
};

export const DELETE_BTN_TITLE_LAN: LanguagesScriptMap<string> = {
  KR: '삭제',
  EN: 'Delete',
};
