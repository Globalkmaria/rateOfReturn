import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectStocks } from '@/features/stockList/selectors';
import Textarea from '@/components/Textarea';

import SelectStockName from './SelectStockName';
import SelectPurchasedId from './SelectPurchasedId';
import SelectSoldId from './SelectSoldId';
import SelectTag from './SelectTag';
import { NoteFormKeys, NoteFormState } from './type';

interface NotePopupFormProps {
  onChange: <K extends NoteFormKeys>(
    fieldName: K,
    value: NoteFormState[K],
  ) => void;
  formState: NoteFormState;
}

const TITLE_PLACEHOLDER = 'Untitled';
const TEXTAREA_PLACEHOLDER = 'Add your note here...';

const TITLE_MAX_LENGTH = 50;

function NotePopupForm({ onChange, formState }: NotePopupFormProps) {
  const stocks = useSelector(selectStocks);
  const stockNameOptionList = stocks.allIds.map(id => ({
    value: stocks.byId[id].mainInfo.stockId,
    label: stocks.byId[id].mainInfo.stockName,
  }));

  const title = formState.title ?? '';
  const stockIdForSelectPurchasedId = formState.stockName?.value ?? null;
  const text = formState.text ?? '';

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > TITLE_MAX_LENGTH) {
      onChange('title', e.target.value.slice(0, TITLE_MAX_LENGTH));
      alert(
        `The title name is too long. The maximum length is ${TITLE_MAX_LENGTH} characters.`,
      );
      return;
    }
    onChange('title', e.target.value);
  };

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange('text', e.target.value);

  return (
    <>
      <StyledTitle
        onChange={onTitleChange}
        value={title}
        placeholder={TITLE_PLACEHOLDER}
      />
      <SelectStockName
        stockNameOptionList={stockNameOptionList}
        stockName={formState.stockName}
        onChange={onChange}
      />
      <SelectPurchasedId
        purchasedId={formState.purchasedId}
        stockId={stockIdForSelectPurchasedId}
        onChange={onChange}
      />
      <SelectSoldId soldId={formState.soldId} onChange={onChange} />
      <SelectTag tag={formState.tag} onChange={onChange} />
      <StyledTextarea
        onChange={onTextareaChange}
        value={text}
        placeholder={TEXTAREA_PLACEHOLDER}
      />
    </>
  );
}

export default NotePopupForm;

const StyledTitle = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  margin-bottom: 10px;
  border: none;
  font-size: 1.6rem;
  font-weight: 600;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;

const StyledTextarea = styled(Textarea)`
  margin-top: 10px;
  height: 300px;

  @media ${({ theme }) => theme.devices.laptop} {
    height: 200px;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    height: 100px;
  }
`;
