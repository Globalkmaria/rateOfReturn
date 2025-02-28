import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Note as NoteType } from '@/features/notes';

import { MOCK_STATE } from '@/__test__/mock/mockState';
import { renderWithProviders } from '@/__test__/renderUI';

import Note from '.';
import { getNoteFilterOptions } from './helper';

describe('Note page', () => {
  const { notes } = MOCK_STATE;

  const renderAndWait = async (preloadedState = {}) => {
    renderWithProviders(<Note />, { preloadedState });
  };

  test('should display control bar correctly', async () => {
    await renderAndWait(MOCK_STATE);
    const searchInput = screen.getByPlaceholderText(/Search by title/i);
    expect(searchInput).toBeInTheDocument();

    const addBtn = screen.getByRole('button', { name: /new note/i });
    expect(addBtn).toBeInTheDocument();

    const stockNameFilter = screen.getByRole('button', { name: /stock name/i });
    expect(stockNameFilter).toBeInTheDocument();
  });

  test('should display note correctly', async () => {
    await renderAndWait(MOCK_STATE);
    const mockNote = notes.collection.byId[notes.collection.allIds[0]];
    const note = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM)[0];
    const withinFirstItem = within(note);

    expect(
      withinFirstItem.getByText(new RegExp(mockNote.title)),
    ).toBeInTheDocument();
    expect(
      withinFirstItem.getByText(new RegExp(mockNote?.text || '')),
    ).toBeInTheDocument();
    expect(
      withinFirstItem.getByText(new RegExp(mockNote.createdAt, 'i')),
    ).toBeInTheDocument();
    expect(
      withinFirstItem.getByText(new RegExp(mockNote.updatedAt, 'i')),
    ).toBeInTheDocument();
  });

  test('should show note chips correctly', async () => {
    await renderAndWait(MOCK_STATE);
    const mockIds = notes.collection.allIds;

    mockIds.forEach((id, idx) => {
      const mockNote = notes.collection.byId[id];
      const note = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM)[idx];
      const withinFirstItem = within(note);

      FILTERS.forEach(filter => {
        if (mockNote[filter.name]) {
          const stockNameChip = withinFirstItem.getByTestId(filter.testId);
          expect(stockNameChip).toBeInTheDocument();

          expect(
            within(stockNameChip).getByText(
              new RegExp(mockNote[filter.name] || ''),
            ),
          ).toBeInTheDocument();
        } else {
          expect(
            withinFirstItem.queryByTestId(filter.testId),
          ).not.toBeInTheDocument();
        }
      });
    });
  });
});

describe('Note list search and filter', () => {
  let user: ReturnType<typeof userEvent.setup>;
  const { notes } = MOCK_STATE;

  const options = getNoteFilterOptions(notes.collection);

  beforeAll(() => {
    user = userEvent.setup();
  });

  const renderAndWait = async (preloadedState = {}) => {
    renderWithProviders(<Note />, { preloadedState });
  };

  test('should search notes correctly', async () => {
    await renderAndWait(MOCK_STATE);
    const searchInput = screen.getByPlaceholderText(/Search by title/i);
    expect(searchInput).toBeInTheDocument();

    const note = notes.collection.byId[notes.collection.allIds[0]];

    await user.type(searchInput, note.title);
    const noteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM);
    expect(noteItems).toHaveLength(1);
    expect(screen.getByText(note.title)).toBeInTheDocument();
  });

  test('should filter notes correctly by stock name', async () => {
    await renderAndWait(MOCK_STATE);
    const stockNameFilter = screen.getByRole('button', { name: /stock name/i });
    const stockNames = options.stockNames;

    await user.click(stockNameFilter);
    const option = screen.getByRole('button', {
      name: new RegExp(stockNames[0].label),
    });
    await user.click(option);

    const noteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM);
    screen.getByText(stockNames[0].label);

    const chips = screen.getAllByTestId(TEXT_IDS.STOCK_NAME_CHIP);
    expect(noteItems).toHaveLength(chips.length);
  });

  test('should filter notes correctly by purchased id', async () => {
    await renderAndWait(MOCK_STATE);
    const stockIdFilter = screen.getByRole('button', { name: /stock id/i });
    const purchasedIds = options.purchasedIds;

    await user.click(stockIdFilter);
    const option = screen.getByRole('button', {
      name: purchasedIds[0]?.label,
    });
    await user.click(option);

    const noteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM);
    screen.getByText(`#${purchasedIds[0]?.label}`);

    const chips = screen.getAllByTestId(TEXT_IDS.PURCHASED_ID_CHIP);
    expect(noteItems).toHaveLength(chips.length);
  });

  test('should filter notes correctly by sold id', async () => {
    await renderAndWait(MOCK_STATE);
    const stockIdFilter = screen.getByRole('button', { name: /sold id/i });
    const soldIds = options.soldIds;

    await user.click(stockIdFilter);
    const option = screen.getByRole('button', {
      name: soldIds[0]?.label,
    });
    await user.click(option);

    const noteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM);
    screen.getByText(`#${soldIds[0]?.label}`);

    const chips = screen.getAllByTestId(TEXT_IDS.SOLD_ID_CHIP);
    expect(noteItems).toHaveLength(chips.length);
  });

  test('should filter notes correctly by tag', async () => {
    await renderAndWait(MOCK_STATE);
    const stockIdFilter = screen.getByRole('button', { name: /tag/i });
    const tags = options.tags;

    await user.click(stockIdFilter);
    const option = screen.getByRole('button', {
      name: new RegExp(tags[0]?.label),
    });
    await user.click(option);

    const noteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM);
    screen.getByText(tags[0]?.label);

    const chips = screen.getAllByTestId(TEXT_IDS.TAG_CHIP);
    expect(noteItems).toHaveLength(chips.length);
  });
});

describe('Note list sort', () => {
  let user: ReturnType<typeof userEvent.setup>;
  const { notes } = MOCK_STATE;

  beforeAll(() => {
    user = userEvent.setup();
  });

  const renderAndWait = async (preloadedState = {}) => {
    renderWithProviders(<Note />, { preloadedState });
  };

  test('should sort by created date in ascending order ', async () => {
    await renderAndWait(MOCK_STATE);

    const sortBtn = screen.getByRole('button', {
      name: /sort/i,
    });
    await user.click(sortBtn);

    const createDateAscBtn = screen.getByRole('button', {
      name: /created date \(oldest first\)/i,
    });
    await user.click(createDateAscBtn);

    const noteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM);
    const firstNote = noteItems[0];

    const oldestNoteId = notes.collection.allIds.toSorted((a, b) => {
      const aDate = new Date(notes.collection.byId[a].createdAt);
      const bDate = new Date(notes.collection.byId[b].createdAt);
      return aDate.getTime() - bDate.getTime();
    })[0];
    const oldestNote = notes.collection.byId[oldestNoteId];

    within(firstNote).getByText(oldestNote.title);
  });

  test('should sort by created date in descending order', async () => {
    await renderAndWait(MOCK_STATE);

    const sortBtn = screen.getByRole('button', {
      name: /sort/i,
    });
    await user.click(sortBtn);

    const createDateDescBtn = screen.getByRole('button', {
      name: /created date \(newest first\)/i,
    });
    await user.click(createDateDescBtn);

    const noteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM);
    const firstNote = noteItems[0];

    const newestNoteId = notes.collection.allIds.toSorted((a, b) => {
      const aDate = new Date(notes.collection.byId[a].createdAt);
      const bDate = new Date(notes.collection.byId[b].createdAt);
      return bDate.getTime() - aDate.getTime();
    })[0];
    const newestNote = notes.collection.byId[newestNoteId];

    within(firstNote).getByText(newestNote.title);
  });

  test('should sort by updated date in ascending order', async () => {
    await renderAndWait(MOCK_STATE);

    const sortBtn = screen.getByRole('button', {
      name: /sort/i,
    });
    await user.click(sortBtn);

    const updateDateAscBtn = screen.getByRole('button', {
      name: /updated date \(oldest first\)/i,
    });
    await user.click(updateDateAscBtn);

    const noteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM);
    const firstNote = noteItems[0];

    const oldestNoteId = notes.collection.allIds.toSorted((a, b) => {
      const aDate = new Date(notes.collection.byId[a].updatedAt);
      const bDate = new Date(notes.collection.byId[b].updatedAt);
      return aDate.getTime() - bDate.getTime();
    })[0];
    const oldestNote = notes.collection.byId[oldestNoteId];

    within(firstNote).getByText(oldestNote.title);
  });

  test('should sort by updated date in descending order', async () => {
    await renderAndWait(MOCK_STATE);

    const sortBtn = screen.getByRole('button', {
      name: /sort/i,
    });
    await user.click(sortBtn);

    const updateDateDescBtn = screen.getByRole('button', {
      name: /updated date \(newest first\)/i,
    });
    await user.click(updateDateDescBtn);

    const noteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM);
    const firstNote = noteItems[0];

    const newestNoteId = notes.collection.allIds.toSorted((a, b) => {
      const aDate = new Date(notes.collection.byId[a].updatedAt);
      const bDate = new Date(notes.collection.byId[b].updatedAt);
      return bDate.getTime() - aDate.getTime();
    })[0];
    const newestNote = notes.collection.byId[newestNoteId];

    within(firstNote).getByText(newestNote.title);
  });
});

describe('Note new note', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeAll(() => {
    user = userEvent.setup();
  });

  const renderAndWait = async (preloadedState = {}) => {
    renderWithProviders(<Note />, { preloadedState });
  };

  test('should open a new note form when clicking on the "new note" button', async () => {
    await renderAndWait(MOCK_STATE);
    const beforeNoteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM).length;

    const TITLE = 'New Note Title';

    const newNoteBtn = screen.getByRole('button', { name: /new note/i });
    await user.click(newNoteBtn);

    const noteForm = screen.getByRole('dialog');
    expect(noteForm).toBeInTheDocument();

    const titleInput = within(noteForm).getByPlaceholderText(/untitled/i);
    await user.type(titleInput, TITLE);

    const saveBtn = screen.getByRole('button', { name: /add/i });
    await user.click(saveBtn);

    const afterNoteItems = screen.getAllByTestId(TEXT_IDS.NOTE_ITEM).length;
    expect(afterNoteItems).toBe(beforeNoteItems + 1);

    const newNote = screen.getByText(TITLE);
    expect(newNote).toBeInTheDocument();
  });
});

const TEXT_IDS = {
  NOTE_ITEM: 'note-item',
  STOCK_NAME_CHIP: 'stock-name__chip',
  PURCHASED_ID_CHIP: 'purchased-id__chip',
  SOLD_ID_CHIP: 'sold-id__chip',
  TAG_CHIP: 'tag__chip',
};

const FILTERS: {
  name: keyof Pick<NoteType, 'stockName' | 'tag' | 'purchasedId' | 'soldId'>;
  testId: string;
}[] = [
  {
    name: 'stockName',
    testId: TEXT_IDS.STOCK_NAME_CHIP,
  },
  {
    name: 'purchasedId',
    testId: TEXT_IDS.PURCHASED_ID_CHIP,
  },
  {
    name: 'soldId',
    testId: TEXT_IDS.SOLD_ID_CHIP,
  },
  {
    name: 'tag',
    testId: TEXT_IDS.TAG_CHIP,
  },
];
