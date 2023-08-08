export type LoginResReq = {
  username: string;
  password: string;
};
export type LoginRepRes = { user: { username: string } };

export type SignupRepReq = LoginResReq;
export type SignupRepRes = LoginRepRes;

export type Stock = {
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

export type StocksRes = Stock[];
