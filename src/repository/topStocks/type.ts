export type TopStock = {
  name: string;
  symbol: string;
  description: string;
  industry: string;
  sector: string;
  financial: {
    revenue: string;
    marketCap: string;
    grossProfit: string;
    operatingIncome: string;
  };
  ratios: {
    roa: number;
    pbr: number;
    per: number;
  };
  rank: number;
  id: string;
  imgUrl: string;
  investUrl: string;
};

export type TopStocksRes = TopStock[];
