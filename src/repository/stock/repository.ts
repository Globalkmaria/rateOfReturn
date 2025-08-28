import { config } from '@/config';
import HttpClient, { ErrorResponse } from '@/network/http';

import { StockPriceRes } from './type';

class StockRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getPrice(symbols: string[]): Promise<StockPriceRes | ErrorResponse> {
    return this.httpClient.fetch(`/prices`, {
      method: 'POST',
      body: {
        symbols,
      },
    });
  }
}

const STOCK_BASE_URL = `${config.server.url}/stocks`;
const httpClient = new HttpClient(STOCK_BASE_URL);
export const stockRepository = new StockRepository(httpClient);

export default StockRepository;
