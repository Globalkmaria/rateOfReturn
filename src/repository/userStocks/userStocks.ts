import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';
import { AddNewUserStockRepRes, DeleteUserItemRepReq } from './type';

class UserStocksRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async addNewUserStock(): Promise<AddNewUserStockRepRes | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'POST',
    });
  }

  async deleteUserStock(stockId: string): Promise<void | ErrorResponse> {
    return this.httpClient.fetch(`/${stockId}`, {
      method: 'DELETE',
    });
  }

  async deleteUserItem({
    stockId,
    itemId,
  }: DeleteUserItemRepReq): Promise<void | ErrorResponse> {
    return this.httpClient.fetch(`/${stockId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }
}

const UserStocksBaseURL = `${config.server.url}/user/stocks`;
const httpClient = new HttpClient(UserStocksBaseURL);
export const userStocksRepository = new UserStocksRepository(httpClient);

export default UserStocksRepository;
