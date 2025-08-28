export interface StockPriceRes {
  data: {
    quotes: {
      symbol: string;
      name: number;
      displayName: number;
      previousClosePrice: number;
    }[];
    date: string;
  };
  successSymbols: string[];
  failedSymbols: string[];
}
