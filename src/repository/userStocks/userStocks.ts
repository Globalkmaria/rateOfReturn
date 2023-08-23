import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';
import {
  AddNewUserItemRepReq,
  AddNewUserItemRepRes,
  AddNewUserStockRepReq,
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

  async addNewUserStock(
    params: AddNewUserStockRepReq,
  ): Promise<AddNewUserStockRepRes | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'POST',
      body: params,
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

  async addNewUserItem({
    stockId,
    ...restParams
  }: AddNewUserItemRepReq): Promise<AddNewUserItemRepRes | ErrorResponse> {
    return this.httpClient.fetch(`/${stockId}/items`, {
      method: 'POST',
      body: restParams,
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
