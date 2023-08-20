import {
  ReplaceUserDataRepReq,
  mergeUserDataRepReq,
} from '../../repository/userData/type';
import UserDataRepository, {
  userDataRepository,
} from '../../repository/userData/userData';
import { Result } from '../type';
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

  async mergeUserData(data: mergeUserDataRepReq): Promise<Result> {
    try {
      const result = await this.repo.mergeUserData(data);
      if ('success' in result) return result;

      throw new Error(result.message);
    } catch (error) {
      console.log(error);
      alert(error);
      return { success: false };
    }
  }

  async getUserData(): Promise<UserDataServiceRes | null> {
    try {
      const userData = await this.repo.getUserData();
      if ('error' in userData) throw new Error(userData.message);

      const stocks = transformStocksDataForFrontend(userData.stocks.stocks);
      const checkedItems = generateInitialCheckInfo(userData.stocks.stocks);
      const groups = transformUserGroupsForFrontend(userData.groups.groups);
      return {
        stocks: {
          stocks,
          nextStockId: userData.stocks.nextStockId,
          nextPurchasedId: userData.stocks.nextItemId,
        },
        checkedItems,
        groups: {
          groups,
          nextGroupId: userData.groups.nextGroupId,
        },
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async replaceUserData(data: ReplaceUserDataRepReq): Promise<Result> {
    try {
      const result = await this.repo.replaceUserData(data);
      if (!result) return { success: true };
      throw new Error(result.message);
    } catch (error) {
      console.log(error);
      alert(error);
      return { success: false };
    }
  }

  async addSampleUserData(): Promise<Result> {
    try {
      const result = await this.repo.addSampleUserData();
      if (!result) return { success: true };
      throw new Error(result.message);
    } catch (error) {
      alert(error);
      console.log(error);
      return { success: false };
    }
  }
}

const userDataService = new UserDataService(userDataRepository);

export default userDataService;
