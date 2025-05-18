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
  FeedTitle,
} from './style';
import { Skeleton2 } from '../Skeleton';

interface Props {
  title: string;
  getFeed: () => Promise<ResultWithData<FeedItem[]>>;
  showDescription?: boolean;
}

function Feed({ title, showDescription, getFeed }: Props) {
  return (
    <FeedContainer>
      <FeedTitle>{title}</FeedTitle>
      <FeedBody
        getFeed={getFeed}
        title={title}
        showDescription={showDescription}
      />
    </FeedContainer>
  );
}

export default Feed;

function FeedBody({ title, showDescription, getFeed }: Props) {
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

  if (isLoading) return <Loading showDescription={showDescription} />;

  if (noContent)
    return (
      <FeedErrorMessage>{`${title} feed could not be loaded.`}</FeedErrorMessage>
    );

  return (
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
  );
}

const array = Array.from({ length: 5 }, (_, i) => i + 1);

function Loading({ showDescription }: Pick<Props, 'showDescription'>) {
  return (
    <FeedList>
      {array.map(item => (
        <FeedListItem key={item}>
          <Skeleton2
            width='300px'
            height='23px'
            margin='0 0 10px 0'
            borderRadius='s'
          />
          <Skeleton2
            width='150px'
            height='17px'
            margin='0 0 10px 0'
            borderRadius='s'
          />
          {showDescription && (
            <Skeleton2 width='100%' height='19px' borderRadius='s' />
          )}
        </FeedListItem>
      ))}
    </FeedList>
  );
}
