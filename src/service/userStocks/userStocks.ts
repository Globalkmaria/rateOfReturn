import { CurrentPriceChanges } from '@/views/List/StockListContent/StockTableMenu/EditCurrentPrice/EditCurrentPriceModal';

import { EditUserStockRepReq } from '@/repository/userStocks/type';

import {
  AddNewUserItemRepReq,
  AddNewUserItemRepRes,
  AddNewUserStockRepReq,
  AddNewUserStockRepRes,
  DeleteUserItemRepReq,
  DeleteUserItemWithStockRepReq,
} from '../../repository/userStocks/type';
import UserStocksRepository, {
  userStocksRepository,
} from '../../repository/userStocks/userStocks';
import { Result } from '../type';
import { generateServerCurrentPrices } from './utils';

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

  async editUserStockData(data: EditUserStockRepReq): Promise<Result> {
    try {
      const result = await this.repo.editUserStockData(data);

      if (!result) return { success: true };

      if (result?.response?.status === 401) {
        return { success: false, message: 'Please log in to edit stock data.' };
      }

      if (result?.response?.status === 400)
        return { success: false, message: 'Please check the input data.' };
      throw new Error('Error accrued while updating stock in server.');
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: 'Could not change stock data.',
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

  async deleteUserItem({
    stockId,
    purchasedId,
  }: DeleteUserItemRepReq): Promise<Result> {
    try {
      const result = await this.repo.deleteUserItem({ stockId, purchasedId });
      if (!result) return { success: true };

      if (result.response.status === 400) {
        throw new Error('Wrong purchasedId id');
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

  async deleteUserItemWithStock({
    stockId,
    purchasedId,
    isOnlyItem,
  }: DeleteUserItemWithStockRepReq): Promise<Result> {
    if (isOnlyItem) return this.deleteUserStock(stockId);
    return this.deleteUserItem({ stockId, purchasedId });
  }

  async editCurrentPrices(data: CurrentPriceChanges): Promise<Result> {
    try {
      const serverData = generateServerCurrentPrices(data);
      const result = await this.repo.editCurrentPrices(serverData);
      if (!result) return { success: true };

      if (result?.response?.status === 400)
        return { success: false, message: 'Please check the input data.' };

      throw new Error('Error accrued while updating current prices in server.');
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: 'Could not change stocks current price.',
      };
    }
  }

  async addStockTag(tag: string): Promise<Result> {
    try {
      const result = await this.repo.addStockTag(tag);
      if (!result) return { success: true };

      if (result?.response?.status === 400)
        return { success: false, message: 'Please check the tag.' };

      throw new Error('Error accrued while adding stock tag in server.');
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: 'Could not add tag.',
      };
    }
  }

  async deleteStockTag(tag: string): Promise<Result> {
    try {
      const result = await this.repo.deleteStockTag(tag);
      if (!result) return { success: true };

      if (result?.response?.status === 400)
        return { success: false, message: 'Please check the tag.' };

      throw new Error('Error accrued while deleting stock tag in server.');
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: 'Could not delete tag.',
      };
    }
  }
}

const userStocksService = new UserStocksService(userStocksRepository);

export default userStocksService;
