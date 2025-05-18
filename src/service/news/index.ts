import axios from 'axios';

import { ResultWithData } from '../type';

export type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source?: string;
};

const PROXY = 'https://allorigins.hexlet.app/get?disableCache=true&url=';

const cleanDescription = (raw: string): string => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(raw, 'text/html');
  return parsed.body.textContent?.trim() || raw;
};

const parseFeed = (
  xmlString: string,
  sourceName: string,
  removeSuffix?: string,
  filterFn?: (item: FeedItem) => boolean,
): FeedItem[] => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'application/xml');

  let items = Array.from(xml.querySelectorAll('item'))
    .slice(0, 5)
    .map(item => {
      const rawDescription =
        item.querySelector('description')?.textContent?.trim() ||
        'No description';
      const titleRaw =
        item.querySelector('title')?.textContent?.trim() || 'No title';
      const title = removeSuffix
        ? titleRaw.replace(removeSuffix, '')
        : titleRaw;

      return {
        title,
        link: item.querySelector('link')?.textContent?.trim() || '#',
        pubDate:
          item.querySelector('pubDate')?.textContent?.trim() || 'No date',
        description: cleanDescription(rawDescription),
        source: item.querySelector('source')?.textContent?.trim() || sourceName,
      };
    });

  if (filterFn) items = items.filter(filterFn);
  return items;
};

const fetchFeed = async (
  feedUrl: string,
  sourceName: string,
  removeSuffix?: string,
  filterFn?: (item: FeedItem) => boolean,
): Promise<ResultWithData<FeedItem[]>> => {
  try {
    const encodedUrl = encodeURIComponent(feedUrl);
    const response = await axios.get(`${PROXY}${encodedUrl}`);
    const xmlString = response.data.contents;

    const items = parseFeed(xmlString, sourceName, removeSuffix, filterFn);
    return { data: items, success: items.length > 0 };
  } catch (err) {
    console.error(`Failed to fetch or parse ${sourceName} feed:`, err);
    return {
      success: false,
      message: `${sourceName} feed could not be loaded.`,
    };
  }
};

export const getWsjFeed = () =>
  fetchFeed(
    'https://news.google.com/rss/search?q=site:wsj.com',
    'WSJ',
    '- WSJ',
    item => !item.title.includes('Print Edition'),
  );

export const getNYTFeed = () =>
  fetchFeed('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', 'NYT');

export const getFTFeed = () =>
  fetchFeed(
    'https://news.google.com/rss/search?q=site:ft.com&hl=en-US&gl=US&ceid=US:en',
    'FT',
    '- Financial Times',
  );
