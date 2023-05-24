import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface StockModalState {
  isOpen: boolean;
  stockId: string;
  purchasedId: string;
  type: 'stock' | 'purchase';
}

type OpenStockModalPayload = {
  stockId: string;
  purchasedId: string;
  type: 'stock' | 'purchase';
};

const initialState: StockModalState = {
  isOpen: false,
  stockId: '',
  purchasedId: '',
  type: 'stock',
};

const stockModalSlice = createSlice({
  name: 'stockModal',
  initialState,
  reducers: {
    resetStockModal: () => initialState,
    initialStockModal: () => initialState,
    openStockModal: (state, action: PayloadAction<OpenStockModalPayload>) => {
      state.isOpen = true;
      state.stockId = action.payload.stockId;
      state.purchasedId = action.payload.purchasedId;
      state.type = action.payload.type;
    },
    closeStockModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectStockModal = (state: RootState) => state.stockModal;

export const {
  openStockModal,
  closeStockModal,
  initialStockModal,
  resetStockModal,
} = stockModalSlice.actions;

export default stockModalSlice.reducer;
