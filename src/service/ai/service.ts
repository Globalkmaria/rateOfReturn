import AIRepository, { aiRepository } from '@/repository/ai/repository';
import { GenerateStockInfoRes } from '@/repository/ai/type';

import { ResultWithData2 } from '../type';

class AiService {
  repo: AIRepository;
  constructor(repo: AIRepository) {
    this.repo = repo;
  }

  async generateStockInfo(
    stockName: string,
  ): Promise<ResultWithData2<GenerateStockInfoRes>> {
    try {
      const result = await this.repo.generateStockInfo(stockName);
      if ('text' in result) {
        return {
          success: true,
          data: result,
        };
      }

      throw new Error(result.message);
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'An error occurred while generating stock information.',
      };
    }
  }
}

const aiService = new AiService(aiRepository);

export default aiService;
