import { http, HttpResponse } from 'msw';
import { TOP_STOCKS } from './mock/topStocks';

export const handlers = [
  http.get('http://localhost:8080/api/v1/const/top-stocks', () => {
    return HttpResponse.json(TOP_STOCKS);
  }),
  http.get('http://localhost:8080/api/v1/auth/me', () => {
    return HttpResponse.json({});
  }),
];
