const required = (key: string, defaultValue = undefined) => {
  const value = import.meta.env[key] || process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
};

export const config = {
  server: {
    url: `${required('VITE_SERVER_URL')}/${required('VITE_SERVER_VERSION')}`,
  },
};
