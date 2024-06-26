export const getCurrentDateTimeString = () => {
  let now = new Date();

  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};

export const getLocalDateTime = (date: string, time: string) => {
  if (date.includes('Z')) {
    date = date.split('T')[0];
  }
  const dateUtil = new Date(date + ' ' + time);

  const localDate = dateUtil.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const localTime = dateUtil.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
  return { localDate, localTime };
};

export const getDateFromIOSString = (date: string | Date) => {
  const dateUtil = new Date(date);
  return dateUtil.toISOString().split('T')[0];
};
