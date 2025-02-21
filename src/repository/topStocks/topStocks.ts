import { TopStocksRes } from './type';
import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';

class TopStocksRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getTopStocks(): Promise<TopStocksRes | ErrorResponse> {
    return this.httpClient.fetch('/top-stocks', {
      method: 'GET',
    });
  }
}

const TopStocksBaseURL = `${config.server.url}/const`;
export const httpClient = new HttpClient(TopStocksBaseURL);
export const topStocksRepository = new TopStocksRepository(httpClient);

export default TopStocksRepository;
