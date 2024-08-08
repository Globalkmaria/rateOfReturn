import dayjs from 'dayjs';

export const formatNoteDate = (date: string) => {
  const dateObj = dayjs(date);
  return dateObj.format('DD MMM YY');
};
