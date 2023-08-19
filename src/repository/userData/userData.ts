import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';
import { ReplaceUserDataRepReq, UserDataRepRes } from './type';

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

  async replaceUserData(
    data: ReplaceUserDataRepReq,
  ): Promise<null | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

const UserDataBaseURL = `${config.server.url}/user/user-data`;
const httpClient = new HttpClient(UserDataBaseURL);
export const userDataRepository = new UserDataRepository(httpClient);

export default UserDataRepository;
