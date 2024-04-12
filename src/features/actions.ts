import { createAction } from '@reduxjs/toolkit';

export const deletePurchasedItem = createAction<{ stockId: string; purchasedId: string }>('stock/deletePurchasedItem');
