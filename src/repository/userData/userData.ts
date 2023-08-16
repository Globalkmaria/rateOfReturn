import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';
import { UserDataRepRes } from './type';

class UserDataRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getUserData(): Promise<UserDataRepRes | ErrorResponse> {
    return this.httpClient.fetch('/user-data', {
      method: 'GET',
    });
  }
}

const UserDataBaseURL = `${config.server.url}/user`;
export const httpClient = new HttpClient(UserDataBaseURL);
export const userDataRepository = new UserDataRepository(httpClient);

export default UserDataRepository;
