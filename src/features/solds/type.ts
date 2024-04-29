import { Collections } from '@/typeUtils/typeGenerators';

export interface Sold {
  stockName: string;

  purchasedId: string;
  purchasedQuantity: number;

  purchasedDate: string;
  purchasedTime: string;
  purchasedPrice: number;

  soldDate: string;
  soldTime: string;
  soldPrice: number;
}

export interface SoldsState {
  list: Collections<Sold>;
}
