import styled from 'styled-components';

import { getFTFeed, getNYTFeed, getWsjFeed } from '@/service/news';

import Feed from '@/components/Feed';

function News() {
  return (
    <NewsContainer>
      <NewsTitle>📰 Latest Headlines</NewsTitle>

      <Feed showDescription getFeed={getNYTFeed} title='The New York Times' />
      <Feed title='WSJ' getFeed={getWsjFeed} />
      <Feed title='Financial Times' getFeed={getFTFeed} />
    </NewsContainer>
  );
}

export default News;

const NewsContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const NewsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.blue300};
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  text-decoration-style: wavy;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.blue300};
    text-decoration-color: ${({ theme }) => theme.colors.black};
    text-decoration-thickness: 4px;
    text-underline-offset: 6px;
    text-decoration-style: solid;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 5px;
  }
`;
