import UserSoldsRepository, {
  AddNewSoldsRepReq,
  EditSoldsRepReq,
  userSoldsRepository,
} from '@/repository/userSolds';
import { Result } from '../type';

class UserSoldsService {
  repo: UserSoldsRepository;
  constructor(repo: UserSoldsRepository) {
    this.repo = repo;
  }

  async addNewSolds(params: AddNewSoldsRepReq): Promise<Result> {
    try {
      const result = await this.repo.addNewSolds(params);
      if (!result) return { success: true };
      if (result?.response?.status === 400)
        return { success: false, message: 'Please check the input data.' };

      throw new Error('Error accrued while updating purchased item in server.');
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: 'Could not add new sold item.',
      };
    }
  }

  async editSold(params: EditSoldsRepReq): Promise<Result> {
    try {
      const result = await this.repo.editSold(params);
      if (!result) return { success: true };

      if (result?.response?.status === 400)
        return { success: false, message: 'Please check the input data.' };

      throw new Error('Error accrued while updating sold item in server.');
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: 'Could not update sold item.',
      };
    }
  }

  async deleteSold(soldId: string): Promise<Result> {
    try {
      const result = await this.repo.deleteSold(soldId);
      if (!result) return { success: true };

      if (result?.response?.status === 400)
        return { success: false, message: 'Please check the id.' };

      throw new Error('Error accrued while deleting sold item in server.');
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: 'Could not delete sold item.',
      };
    }
  }
}

const userSoldsService = new UserSoldsService(userSoldsRepository);

export default userSoldsService;
