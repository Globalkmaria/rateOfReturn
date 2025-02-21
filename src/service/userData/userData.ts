import formatGroupAsServerFormat from '@/utils/formatGroupAsServerFormat';
import formatStockAsServerFormat from '@/utils/formatStockAsServerFormat';

import { GROUP_STATE_SAMPLE } from '@/features/groups/mockData';
import { STOCK_STATE_SAMPLE } from '@/features/stockList/mockData';

import {
  ReplaceUserDataRepReq,
  MergeUserDataRepReq,
  AddCurrentPageSample,
} from '../../repository/userData/type';
import UserDataRepository, {
  userDataRepository,
} from '../../repository/userData/userData';
import { Result } from '../type';
import { UserDataServiceRes } from './type';
import { transformUserDataForFrontend } from './util';

class UserDataService {
  repo: UserDataRepository;
  constructor(repo: UserDataRepository) {
    this.repo = repo;
  }

  async mergeUserData(data: MergeUserDataRepReq): Promise<Result> {
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

      return transformUserDataForFrontend(userData);
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

  async addStockAndGroupSample(): Promise<Result> {
    try {
      const data: AddCurrentPageSample = {
        stocks: formatStockAsServerFormat(STOCK_STATE_SAMPLE) || {},
        groups: formatGroupAsServerFormat(GROUP_STATE_SAMPLE)?.groups || {},
      };

      const result = await this.repo.addStockAndGroupSample(data);
      if ('success' in result) return result;

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
