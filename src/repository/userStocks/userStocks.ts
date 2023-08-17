import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';

class UserStocksRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async deleteUserStock(stockId: string): Promise<void | ErrorResponse> {
    return this.httpClient.fetch(`/${stockId}`, {
      method: 'DELETE',
    });
  }
}

const UserStocksBaseURL = `${config.server.url}/user/stocks`;
const httpClient = new HttpClient(UserStocksBaseURL);
export const userStocksRepository = new UserStocksRepository(httpClient);

export default UserStocksRepository;
