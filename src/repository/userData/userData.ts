import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';
import { Result } from '../../service/type';
import {
  ReplaceUserDataRepReq,
  UserDataRepRes,
  mergeUserDataRepReq,
} from './type';

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
    data: mergeUserDataRepReq,
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

  async addSampleUserData(): Promise<null | ErrorResponse> {
    return this.httpClient.fetch('/sample', {
      method: 'POST',
    });
  }
}

const UserDataBaseURL = `${config.server.url}/user/user-data`;
const httpClient = new HttpClient(UserDataBaseURL);
export const userDataRepository = new UserDataRepository(httpClient);

export default UserDataRepository;
