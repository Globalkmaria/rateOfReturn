import { config } from '../../config';
import HttpClient, { ErrorResponse } from '../../network/http';
import { AddNewUserGroupRepReq, AddNewUserGroupRepRes } from './type';

class UserGroupsRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async addNewUserGroup(
    userGroup: AddNewUserGroupRepReq,
  ): Promise<AddNewUserGroupRepRes | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'POST',
      body: JSON.stringify(userGroup),
    });
  }

  async deleteUserGroup(groupId: string): Promise<null | ErrorResponse> {
    return this.httpClient.fetch(`/${groupId}`, {
      method: 'DELETE',
    });
  }
}

const UserGroupsBaseURL = `${config.server.url}/user/groups`;
const httpClient = new HttpClient(UserGroupsBaseURL);
export const userGroupsRepository = new UserGroupsRepository(httpClient);

export default UserGroupsRepository;
