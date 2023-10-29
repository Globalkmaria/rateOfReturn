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
  img: {
    url: string;
    webp: string;
    webp300: string;
    webp400: string;
    jpg: string;
  };

  rank: number;
  id: string;
  imgUrl: string;
  investUrl: string;
};

export type TopStocksRes = TopStock[];
