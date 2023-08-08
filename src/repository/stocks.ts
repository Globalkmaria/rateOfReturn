import { config } from '../config';
import HttpClient, { ErrorResponse } from '../network/http';
import { StocksRes } from './type';

class StocksRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getStocks(): Promise<StocksRes | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'GET',
    });
  }
}

const StocksBaseURL = `${config.server.url}/stocks`;
export const httpClient = new HttpClient(StocksBaseURL);
export const stocksRepository = new StocksRepository(httpClient);

export default StocksRepository;
