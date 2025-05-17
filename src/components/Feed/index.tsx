import { useEffect, useState } from 'react';

import { FeedItem } from '@/service/news';
import { ResultWithData } from '@/service/type';

import {
  FeedContainer,
  FeedDate,
  FeedDescription,
  FeedErrorMessage,
  FeedItemTitle,
  FeedList,
  FeedListItem,
  FeedLoading,
  FeedTitle,
} from './style';

interface Props {
  title: string;
  getFeed: () => Promise<ResultWithData<FeedItem[]>>;
  showDescription?: boolean;
}

function Feed({ title, showDescription, getFeed }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<ResultWithData<FeedItem[]>>();

  const noContent = !result?.data?.length;

  useEffect(() => {
    const fetchFeed = async () => {
      const result = await getFeed();
      setResult(result);
      setIsLoading(false);
    };

    fetchFeed();
  }, [getFeed]);

  return (
    <FeedContainer>
      <FeedTitle>{title}</FeedTitle>
      {isLoading ? (
        <FeedLoading>Loading...</FeedLoading>
      ) : noContent ? (
        <FeedErrorMessage>{`${title} feed could not be loaded.`}</FeedErrorMessage>
      ) : (
        <FeedList>
          {result?.data?.map((item, idx) => (
            <FeedListItem key={idx}>
              <a href={item.link} target='_blank' rel='noopener noreferrer'>
                <FeedItemTitle>{item.title}</FeedItemTitle>
                <FeedDate>{new Date(item.pubDate).toLocaleString()}</FeedDate>
                {showDescription && (
                  <FeedDescription>{item.description}</FeedDescription>
                )}
              </a>
            </FeedListItem>
          ))}
        </FeedList>
      )}
    </FeedContainer>
  );
}

export default Feed;
