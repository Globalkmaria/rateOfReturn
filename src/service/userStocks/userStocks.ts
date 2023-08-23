import {
  AddNewUserItemRepReq,
  AddNewUserItemRepRes,
  AddNewUserStockRepReq,
  AddNewUserStockRepRes,
  DeleteUserItemRepReq,
} from '../../repository/userStocks/type';
import UserStocksRepository, {
  userStocksRepository,
} from '../../repository/userStocks/userStocks';
import { Result } from '../type';
import { EditUserItemServiceReq, EditUserStockServiceReq } from './type';
import { renameItemKeysForServer, renameStockKeysForServer } from './utils';

class UserStocksService {
  repo: UserStocksRepository;
  constructor(repo: UserStocksRepository) {
    this.repo = repo;
  }

  async addNewUserStock(
    params: AddNewUserStockRepReq,
  ): Promise<AddNewUserStockRepRes | null> {
    try {
      const result = await this.repo.addNewUserStock(params);

      if ('stockId' in result) {
        return result;
      }

      throw new Error('Could not add new stock');
    } catch (err) {
      console.log(err);
      alert('Could not add new stock');
      return null;
    }
  }

  async editUserStock(params: EditUserStockServiceReq): Promise<Result> {
    try {
      const data = renameStockKeysForServer(params.data);
      const result = await this.repo.editUserStock({ ...params, data });

      if (!result) {
        return { success: true };
      }

      if (result?.response?.status === 400) {
        alert('Please check the input data');
        return { success: false };
      }

      throw new Error('Wrong stock id');
    } catch (err) {
      console.log(err);
      alert('Could not change stock data');
      return {
        success: false,
      };
    }
  }

  async deleteUserStock(stockId: string): Promise<Result> {
    try {
      const result = await this.repo.deleteUserStock(stockId);
      if (!result) return { success: true };

      if (result.response.status === 400) {
        throw new Error('Wrong stock id');
      }

      throw new Error(result.message);
    } catch (err) {
      console.log(err);
      alert('Could not delete stock');
      return {
        success: false,
      };
    }
  }

  async addNewUserItem(
    params: AddNewUserItemRepReq,
  ): Promise<AddNewUserItemRepRes | null> {
    try {
      const result = await this.repo.addNewUserItem(params);
      if ('stockId' in result) {
        return result;
      }

      throw new Error('Could not add new purchase item');
    } catch (err) {
      console.log(err);
      alert('Could not add new purchase item');
      return null;
    }
  }

  async editUserItem(params: EditUserItemServiceReq): Promise<Result> {
    try {
      const data = renameItemKeysForServer(params.data);
      const result = await this.repo.editUserItem({
        ...params,
        data,
      });

      if (!result) {
        return { success: true };
      }

      if (result?.response?.status === 400) {
        alert('Please check the input data');
        return { success: false };
      }

      throw new Error('Wrong stock id');
    } catch (err) {
      console.log(err);
      alert('Could not change stock data');
      return {
        success: false,
      };
    }
  }

  async deleteUserItem({
    stockId,
    itemId,
  }: DeleteUserItemRepReq): Promise<Result> {
    try {
      const result = await this.repo.deleteUserItem({ stockId, itemId });
      if (!result) return { success: true };

      if (result.response.status === 400) {
        throw new Error('Wrong itemId id');
      }

      throw new Error(result.message);
    } catch (err) {
      console.log(err);
      alert('Could not delete stock');
      return {
        success: false,
      };
    }
  }
}

const userStocksService = new UserStocksService(userStocksRepository);

export default userStocksService;
