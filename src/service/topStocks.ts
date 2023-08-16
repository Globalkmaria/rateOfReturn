import TopStocksRepository, {
  topStocksRepository,
} from '../repository/topStocks/topStocks';
import { TopStocksRes } from '../repository/topStocks/type';

class TopStocksService {
  repo: TopStocksRepository;
  constructor(repo: TopStocksRepository) {
    this.repo = repo;
  }

  async getTopStocks(): Promise<TopStocksRes> {
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

const topStocksService = new TopStocksService(topStocksRepository);

export default topStocksService;
