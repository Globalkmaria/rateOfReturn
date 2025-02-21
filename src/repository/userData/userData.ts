import {
  ReplaceUserDataRepReq,
  UserDataRepRes,
  MergeUserDataRepReq,
  AddCurrentPageSample,
} from './type';
import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';
import { Result } from '../../service/type';

class UserDataRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getUserData(): Promise<UserDataRepRes | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'GET',
    });
  }

  async mergeUserData(
    data: MergeUserDataRepReq,
  ): Promise<Result | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async replaceUserData(
    data: ReplaceUserDataRepReq,
  ): Promise<null | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async addStockAndGroupSample(
    data: AddCurrentPageSample,
  ): Promise<Result | ErrorResponse> {
    return this.httpClient.fetch('/samples/current', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

const UserDataBaseURL = `${config.server.url}/user/user-data`;
const httpClient = new HttpClient(UserDataBaseURL);
export const userDataRepository = new UserDataRepository(httpClient);

export default UserDataRepository;
