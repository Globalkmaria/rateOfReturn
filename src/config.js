const required = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
};

export const config = {
  server: {
    url: `${required('REACT_APP_SERVER_URL')}/${required(
      'REACT_APP_SERVER_VERSION',
    )}`,
  },
};
