import { NotesState } from './type';

export const NOTES_MOCK_DATA: NotesState = {
  collection: {
    byId: {
      '1': {
        id: '1',
        title: 'First Note',
        text: 'This is my first note.',
        createdAt: '31 JAN 24',
        updatedAt: '31 JAN 24',
        stockId: '1',
        stockName: 'APPLE',
        purchasedId: '1',
        soldId: '1',
        tag: 'stock',
      },
      '2': {
        id: '2',
        title: 'Second Note',
        text: 'This is my second note.',
        createdAt: '31 JAN 24',
        updatedAt: '31 JAN 24',
        tag: 'nasdaq',
      },
      '3': {
        id: '3',
        title: 'Third Note',
        text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdAt: '31 JAN 24',
        updatedAt: '31 JAN 24',
        purchasedId: '2',
      },
      '4': {
        id: '4',
        title: 'Fourth Note',
        text: 'This is my fourth note.',
        createdAt: '31 JAN 24',
        updatedAt: '31 JAN 24',
        stockId: '3',
        stockName: 'GOOGLE',
      },
      '5': {
        id: '5',
        title: 'Fifth Note',
        text: 'This is my fifth note.',
        createdAt: '31 JAN 24',
        updatedAt: '31 JAN 24',
        soldId: '2',
      },
      '6': {
        id: '6',
        title: 'Sixth Note',
        createdAt: '31 JAN 24',
        updatedAt: '31 JAN 24',
      },
    },
    allIds: ['1', '2', '3', '4', '5', '6'],
  },
  nextId: 7,
};
