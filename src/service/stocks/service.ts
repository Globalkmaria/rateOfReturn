import StockRepository, {
  stockRepository,
} from '@/repository/stock/repository';
import { StockPriceRes } from '@/repository/stock/type';

import { ResultWithData2 } from '../type';

class StockService {
  repo: StockRepository;
  constructor(repo: StockRepository) {
    this.repo = repo;
  }

  async getPrice(symbols: string[]): Promise<ResultWithData2<StockPriceRes>> {
    try {
      const result = await this.repo.getPrice(symbols);
      if ('data' in result) {
        return {
          success: true,
          data: result,
        };
      }

      if ('message' in result) {
        return {
          message: result.message,
          success: false,
        };
      }

      throw new Error('An error occurred while fetching stock price.');
    } catch (error) {
      console.error(error);
      return {
        message: 'An error occurred while getting stock price.',
        success: false,
      };
    }
  }
}

const stockService = new StockService(stockRepository);
export default stockService;
