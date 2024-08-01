import { MAIN_GROUP_ID } from '@/features/groups/mockData';

export const checkIfMainGroup = (groupId: string) => groupId === MAIN_GROUP_ID;

export const validateGroupId = (groupId: string, groupIds: string[]) =>
  groupId === MAIN_GROUP_ID || groupIds.includes(groupId);
