import { RadioSelectProps } from '@/components/RadioSelect';

export const NOTE_SORT_OPTIONS: RadioSelectProps['options'] = [
  {
    value: 'createdDate-asc',
    label: 'Created date (Oldest first)',
  },
  {
    value: 'createdDate-desc',
    label: 'Created date (Newest first)',
  },
  {
    value: 'updatedDate-asc',
    label: 'Updated date (Oldest first)',
  },
  {
    value: 'updatedDate-desc',
    label: 'Updated date (Newest first)',
  },
];
