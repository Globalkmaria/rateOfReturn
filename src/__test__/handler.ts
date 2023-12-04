import { rest } from 'msw';
import { TOP_STOCKS } from './mock/topStocks';

export const handlers = [
  rest.get('http://localhost:8080/api/v1/const/top-stocks', (req, res, ctx) => {
    return res(ctx.json(TOP_STOCKS));
  }),
  rest.get('http://localhost:8080/api/v1/auth/me', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
];
