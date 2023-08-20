import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';
import {
  AddNewUserItemRepRes,
  AddNewUserStockRepRes,
  DeleteUserItemRepReq,
  EditUserItemRepReq,
  EditUserStockRepReq,
} from './type';

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

  async editUserStock({
    stockId,
    data,
  }: EditUserStockRepReq): Promise<void | ErrorResponse> {
    return this.httpClient.fetch(`/${stockId}`, {
      method: 'PATCH',
      body: { ...data },
    });
  }

  async deleteUserStock(stockId: string): Promise<void | ErrorResponse> {
    return this.httpClient.fetch(`/${stockId}`, {
      method: 'DELETE',
    });
  }

  async addNewUserItem(
    stockId: string,
  ): Promise<AddNewUserItemRepRes | ErrorResponse> {
    return this.httpClient.fetch(`/${stockId}/items`, {
      method: 'POST',
    });
  }

  async editUserItem({
    stockId,
    itemId,
    data,
  }: EditUserItemRepReq): Promise<void | ErrorResponse> {
    return this.httpClient.fetch(`/${stockId}/items/${itemId}`, {
      method: 'PATCH',
      body: { ...data },
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
