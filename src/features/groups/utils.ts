import { Group } from './type';

export const getNewGroupInfo = (
  groupId: string,
  groupName: string,
  stocks: Group['stocks'],
): Group => {
  return {
    groupId,
    groupName,
    stocks,
  };
};
