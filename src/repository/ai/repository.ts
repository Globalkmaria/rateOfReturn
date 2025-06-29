import { config } from '@/config';

import { GenerateStockInfoRes } from './type';
import HttpClient, { ErrorResponse } from '../../network/http';

class AIRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async generateStockInfo(
    stockName: string,
  ): Promise<GenerateStockInfoRes | ErrorResponse> {
    return this.httpClient.fetch(`/stock-info`, {
      method: 'POST',
      body: {
        stockName,
      },
    });
  }
}

const AI_BASE_URL = `${config.server.url}/ai`;
const httpClient = new HttpClient(AI_BASE_URL);
export const aiRepository = new AIRepository(httpClient);

export default AIRepository;
