import UserDataRepository, {
  userDataRepository,
} from '../../repository/userData/userData';
import { UserDataServiceRes } from './type';
import {
  generateInitialCheckInfo,
  transformStocksDataForFrontend,
  transformUserGroupsForFrontend,
} from './util';

class UserDataService {
  repo: UserDataRepository;
  constructor(repo: UserDataRepository) {
    this.repo = repo;
  }

  async getUserData(): Promise<UserDataServiceRes | null> {
    try {
      const userData = await this.repo.getUserData();
      if ('error' in userData) throw new Error(userData.message);

      const stocks = transformStocksDataForFrontend(userData.stocks.stocks);
      const checkedItems = generateInitialCheckInfo(userData.stocks.stocks);
      const groups = transformUserGroupsForFrontend(userData.groups.groups);
      return {
        stocks,
        checkedItems,
        groups,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

const userDataService = new UserDataService(userDataRepository);

export default userDataService;
