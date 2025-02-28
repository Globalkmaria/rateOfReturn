import { TopStock } from '../../repository/topStocks/type';

export const TOP_STOCKS: TopStock[] = [
  {
    name: 'Apple',
    symbol: 'AAPL',
    description:
      'Apple Inc. (Apple) designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories and sells a range of related services.',
    industry: 'Computers, Phones & Household Electronics',
    sector: 'Technology',
    financial: {
      revenue: '$385.09B',
      marketCap: '$2.8T',
      grossProfit: '$166.816B',
      operatingIncome: '$112.226B',
    },
    ratios: {
      roa: 28.36,
      pbr: 49.48,
      per: 29.28,
    },
    rank: 1,
    img: {
      url: 'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/apple_logo_400.webp',
      webp: 'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/apple_logo_400.webp',
      webp300:
        'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/apple_logo_300.webp',
      webp400:
        'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/apple_logo_400.webp',
      jpg: 'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/apple_logo.jpg',
    },
    id: '64d2085483f9e147ec003cd8',
    imgUrl:
      'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/apple_logo.webp',
    investUrl: 'https://www.investing.com/equities/apple-computer-inc',
  },
  {
    name: 'Microsoft',
    symbol: 'MSFT',
    description:
      'Microsoft Corporation develops and supports software, services, devices and solutions worldwide.',
    industry: 'Software & IT Services',
    sector: 'Technology',
    financial: {
      revenue: '$211.915B',
      marketCap: '$2.45T',
      grossProfit: '$146.052B',
      operatingIncome: '$88.523B',
    },
    ratios: {
      roa: 18.63,
      pbr: 12.56,
      per: 33.98,
    },
    rank: 2,
    img: {
      url: 'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/Microsoft_logo_400.webp',
      webp: 'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/Microsoft_logo_400.webp',
      webp300:
        'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/Microsoft_logo_300.webp',
      webp400:
        'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/Microsoft_logo_400.webp',
      jpg: 'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/microsoft_logo.jpg',
    },
    id: '64d20a9283f9e147ec003cd9',
    imgUrl:
      'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/Microsoft_logo.svg.webp',
    investUrl: 'https://www.investing.com/equities/microsoft-corp',
  },
  {
    rank: 3,
    name: 'Alphabet (Google)',
    symbol: 'GOOG',
    description:
      "The Company's segments include Google Services, Google Cloud, and Other Bets",
    industry: 'Software & IT Services',
    sector: 'Technology',
    financial: {
      revenue: '$289.531B',
      marketCap: '$1.66T',
      grossProfit: '$160.503B',
      operatingIncome: '$74.548B',
    },
    ratios: {
      roa: 16.55,
      pbr: 6.7,
      per: 16.55,
    },
    img: {
      url: 'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/google_logo_400.webp',
      webp: 'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/google_logo_400.webp',
      webp300:
        'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/google_logo_300.webp',
      webp400:
        'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/google_logo_400.webp',
      jpg: 'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/google_logo.jpg',
    },
    id: '64d20e2c83f9e147ec003cdb',
    imgUrl:
      'https://rorconst.s3.ap-northeast-2.amazonaws.com/logo/google_logo.svg.webp',
    investUrl: 'https://www.investing.com/equities/google-inc-c',
  },
];
