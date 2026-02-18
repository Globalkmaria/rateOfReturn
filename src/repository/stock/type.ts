export interface StockPriceRes {
  data: {
    quotes: {
      symbol: string;
      name: string;
      displayName: string;
      previousClosePrice: number;
    }[];
    date: string;
  };
  successSymbols: string[];
  failedSymbols: string[];
}
