import { RadioSelectProps } from '@/components/RadioSelect';

export const NOTE_SORT_OPTIONS: RadioSelectProps['options'] = [
  {
    value: 'createdDate-asc',
    label: 'Sort by Created Date (Oldest First)',
  },
  {
    value: 'createdDate-desc',
    label: 'Sort by Created Date (Newest First)',
  },
  {
    value: 'updatedDate-asc',
    label: 'Sort by Updated Date (Oldest First)',
  },
  {
    value: 'updatedDate-desc',
    label: 'Sort by Updated Date (Newest First)',
  },
];
