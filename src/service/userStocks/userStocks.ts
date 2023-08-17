import { AddNewUserStockRepRes } from '../../repository/userStocks/type';
import UserStocksRepository, {
  userStocksRepository,
} from '../../repository/userStocks/userStocks';
import { Result } from '../type';

class UserStocksService {
  repo: UserStocksRepository;
  constructor(repo: UserStocksRepository) {
    this.repo = repo;
  }

  async deleteUserStock(stockId: string): Promise<Result> {
    try {
      const result = await this.repo.deleteUserStock(stockId);
      if (result && result.response.status === 400) {
        throw new Error('Wrong stock id');
      }

      return { success: true };
    } catch (err) {
      console.log(err);
      alert('Could not delete stock');
      return {
        success: false,
      };
    }
  }

  async addNewUserStock(): Promise<AddNewUserStockRepRes | null> {
    try {
      const result = await this.repo.addNewUserStock();
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
}

const userStocksService = new UserStocksService(userStocksRepository);

export default userStocksService;
