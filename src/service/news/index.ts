import axios from 'axios';

import { ResultWithData } from '../type';

export type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

export const getWsjFeed = async (): Promise<ResultWithData<FeedItem[]>> => {
  try {
    const proxyUrl = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
    const feedUrl = encodeURIComponent(
      'https://news.google.com/rss/search?q=site:wsj.com',
    );

    const response = await axios.get(`${proxyUrl}${feedUrl}`);
    const xmlString = response.data.contents;

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'application/xml');

    const itemsArray: FeedItem[] = Array.from(xml.querySelectorAll('item'))
      .slice(0, 5)
      .map(item => {
        const rawDescription =
          item.querySelector('description')?.textContent?.trim() ||
          'No description';
        const parser = new DOMParser();
        const parsedDescriptionDoc = parser.parseFromString(
          rawDescription,
          'text/html',
        );
        const cleanDescription =
          parsedDescriptionDoc.body.textContent?.trim() || rawDescription;

        return {
          title:
            item
              .querySelector('title')
              ?.textContent?.trim()
              .replace('- WSJ', '') || 'No title',
          link: item.querySelector('link')?.textContent?.trim() || '#',
          pubDate:
            item.querySelector('pubDate')?.textContent?.trim() || 'No date',
          description: cleanDescription,
          source:
            item.querySelector('source')?.textContent?.trim() ||
            'Unknown source',
        };
      })
      .filter(item => {
        if (item.title.includes('Print Edition')) return false;
        return true;
      });
    console.log(itemsArray);

    return { data: itemsArray, success: itemsArray.length > 0 };
  } catch (err) {
    console.error('Failed to fetch or parse WSJ feed:', err);
    return {
      success: false,
      message: 'WSJ feed could not be loaded.',
    };
  }
};

export const getNYTFeed = async (): Promise<ResultWithData<FeedItem[]>> => {
  try {
    const proxyUrl = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
    const feedUrl = encodeURIComponent(
      'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    );

    const response = await axios.get(`${proxyUrl}${feedUrl}`);
    const xmlString = response.data.contents;

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'application/xml');

    const itemsArray: FeedItem[] = Array.from(xml.querySelectorAll('item'))
      .slice(0, 5)
      .map(item => ({
        title: item.querySelector('title')?.textContent?.trim() || 'No title',
        link: item.querySelector('link')?.textContent?.trim() || '#',
        pubDate:
          item.querySelector('pubDate')?.textContent?.trim() || 'No date',
        description:
          item.querySelector('description')?.textContent?.trim() ||
          'No description',
      }));

    return { data: itemsArray, success: itemsArray.length > 0 };
  } catch (err) {
    console.error('Failed to fetch or parse NYT RSS feed:', err);
    return {
      success: false,
      message: 'NYT feed could not be loaded.',
    };
  }
};

export const getFTFeed = async (): Promise<ResultWithData<FeedItem[]>> => {
  try {
    const proxyUrl = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
    const feedUrl =
      'https://news.google.com/rss/search?q=site:ft.com&hl=en-US&gl=US&ceid=US:en';

    const response = await axios.get(`${proxyUrl}${feedUrl}`);
    const xmlString = response.data.contents;

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'application/xml');

    const itemsArray: FeedItem[] = Array.from(xml.querySelectorAll('item'))
      .slice(0, 5)
      .map(item => {
        const rawDescription =
          item.querySelector('description')?.textContent?.trim() ||
          'No description';
        const parser = new DOMParser();
        const parsedDescriptionDoc = parser.parseFromString(
          rawDescription,
          'text/html',
        );
        const cleanDescription =
          parsedDescriptionDoc.body.textContent?.trim() || rawDescription;

        return {
          title:
            item
              .querySelector('title')
              ?.textContent?.trim()
              .replace('- Financial Times', '') || 'No title',
          link: item.querySelector('link')?.textContent?.trim() || '#',
          pubDate:
            item.querySelector('pubDate')?.textContent?.trim() || 'No date',
          description: cleanDescription,
          source:
            item.querySelector('source')?.textContent?.trim() ||
            'Unknown source',
        };
      });

    return { data: itemsArray, success: itemsArray.length > 0 };
  } catch (err) {
    console.error('Failed to fetch or parse FT RSS feed:', err);
    return {
      success: false,
      message: 'FT feed could not be loaded.',
    };
  }
};
