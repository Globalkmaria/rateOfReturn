import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type ModalState = {
  isOpen: boolean;
  props: any;
};

interface StockModalState {
  [modalName: string]: ModalState;
}

type OpenStockModalPayload = {
  modalName: string;
  props?: any;
};

const initialState: StockModalState = {};

const stockModalSlice = createSlice({
  name: 'stockModals',
  initialState,
  reducers: {
    resetStockModal: () => initialState,
    initialStockModal: () => initialState,
    openStockModal: (state, action: PayloadAction<OpenStockModalPayload>) => {
      state[action.payload.modalName] = {
        isOpen: true,
        props: action.payload.props,
      };
    },
    closeStockModal: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const selectStockModals = (state: RootState) => state.stockModals;
export const selectModalProps = (modalName: string) =>
  createSelector(
    [selectStockModals],
    (stockModals) => stockModals[modalName]?.props,
  );

export const {
  openStockModal,
  closeStockModal,
  initialStockModal,
  resetStockModal,
} = stockModalSlice.actions;

export default stockModalSlice.reducer;
