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
