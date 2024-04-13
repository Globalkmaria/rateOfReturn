export const splitFiles = (id: string) => {
  if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('react-router'))
    return '@react-router';
  if (id.includes('react-dom')) return 'react-dom';
  if (id.includes('chart.js')) return 'chart';
  if (id.includes('axios')) return 'axios';
  if (id.includes('styled-components')) return 'styled-components';
  if (id.includes('node_modules')) return 'node_modules';
};
