import { Collections } from '@/typeUtils/typeGenerators';

export interface Sold {
  stockName: string;

  purchaseId: string;
  purchasedDate: string;
  purchasedTime: string;
  purchasedQuantity: number;
  purchasedPrice: number;

  soldDate: string;
  soldTime: string;
  soldPrice: number;
}

export interface SoldState {
  list: Collections<Sold>;
}
