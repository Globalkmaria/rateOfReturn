const files = {
  'react-router-dom': '@react-router',
  '@remix-run': '@react-router',
  'react-router': '@react-router',
  'react-dom': 'react-dom',
  'chart.js': 'chart',
  axios: 'axios',
  'styled-components': 'styled-components',
  node_modules: 'node_modules',
};

const filesKeys = Object.keys(files);

export const splitFiles = (id: string) => {
  for (const key of filesKeys) {
    if (id.includes(key)) return files[key];
  }
};
