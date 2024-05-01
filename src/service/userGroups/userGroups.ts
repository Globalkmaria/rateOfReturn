import {
  AddNewUserGroupRepReq,
  AddNewUserGroupRepRes,
  PurchasedItemGroupRepReq,
} from '../../repository/userGroups/type';
import UserGroupsRepository, {
  userGroupsRepository,
} from '../../repository/userGroups/userGroups';
import { Result } from '../type';

class UserGroupsService {
  repo: UserGroupsRepository;
  constructor(repo: UserGroupsRepository) {
    this.repo = repo;
  }

  async addNewUserGroup(
    userGroup: AddNewUserGroupRepReq,
  ): Promise<AddNewUserGroupRepRes | null> {
    try {
      const result = await this.repo.addNewUserGroup(userGroup);
      if ('groupId' in result) {
        return result;
      }

      if (result && result.response.status === 400) {
        alert(result.message);
        return null;
      }

      throw new Error('Could not add new group');
    } catch (err) {
      console.log(err);
      alert('Could not add new group');
      return null;
    }
  }

  async deleteUserGroup(groupId: string): Promise<Result> {
    try {
      await this.repo.deleteUserGroup(groupId);
      return { success: true };
    } catch (err) {
      console.log(err);
      alert('Could not delete group');
      return {
        success: false,
      };
    }
  }
  async addPurchasedItemToUserGroup({
    groupId,
    stockId,
    purchasedId,
  }: PurchasedItemGroupRepReq): Promise<Result> {
    try {
      await this.repo.addPurchasedItemToUserGroup({
        groupId,
        stockId,
        purchasedId,
      });
      return { success: true };
    } catch (err) {
      console.log(err);
      alert('Could not add purchased item to group');
      return {
        success: false,
      };
    }
  }

  async deletePurchasedItemFromUserGroup({
    groupId,
    stockId,
    purchasedId,
  }: PurchasedItemGroupRepReq): Promise<Result> {
    try {
      await this.repo.deletePurchasedItemFromUserGroup({
        groupId,
        stockId,
        purchasedId,
      });
      return { success: true };
    } catch (err) {
      console.log(err);
      alert('Could not delete purchased item from group');
      return {
        success: false,
      };
    }
  }
}

const userGroupsService = new UserGroupsService(userGroupsRepository);

export default userGroupsService;
