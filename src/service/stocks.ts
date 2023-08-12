import StocksRepository, { stocksRepository } from '../repository/stocks';
import { StocksRes } from '../repository/type';

class StocksService {
  repo: StocksRepository;
  constructor(repo: StocksRepository) {
    this.repo = repo;
  }

  async getStocks(): Promise<StocksRes> {
    try {
      const result = await this.repo.getTopStocks();
      if ('error' in result) {
        throw new Error(result.message);
      }
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}

const stocksService = new StocksService(stocksRepository);

export default stocksService;
