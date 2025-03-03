import { config } from '@/config';
import HttpClient, { ErrorResponse } from '@/network/http';

import { AddNewSoldsRepReq, EditSoldsRepReq } from './type';
import { ReplaceUserDataRepReq } from '../userData/type';

class UserSoldsRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async addNewSolds(params: AddNewSoldsRepReq): Promise<void | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'POST',
      body: params,
    });
  }
  async editSold({ id, data }: EditSoldsRepReq): Promise<void | ErrorResponse> {
    return this.httpClient.fetch(`/${id}`, {
      method: 'PATCH',
      body: data,
    });
  }
  async deleteSold(id: string): Promise<void | ErrorResponse> {
    return this.httpClient.fetch(`/${id}`, {
      method: 'DELETE',
    });
  }

  async replaceSold(
    data: Pick<ReplaceUserDataRepReq, 'solds'>,
  ): Promise<void | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'PUT',
      body: data,
    });
  }
}

const UserSoldsBaseURL = `${config.server.url}/user/solds`;
const httpClient = new HttpClient(UserSoldsBaseURL);
export const userSoldsRepository = new UserSoldsRepository(httpClient);

export default UserSoldsRepository;
