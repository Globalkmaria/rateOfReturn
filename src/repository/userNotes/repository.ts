import { ErrorResponse } from 'react-router-dom';

import { NoteContent } from '@/features/notes';

import { config } from '@/config';
import HttpClient from '@/network/http';

import { AddNewNoteRes, EditNoteRes } from './type';

class UserNotesRepository {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async addNewNote(note: NoteContent): Promise<AddNewNoteRes | ErrorResponse> {
    return this.httpClient.fetch('/', {
      method: 'POST',
      body: { note },
    });
  }

  async editNote(
    noteId: string,
    note: Partial<NoteContent>,
  ): Promise<EditNoteRes | ErrorResponse> {
    return this.httpClient.fetch(`/${noteId}`, {
      method: 'PUT',
      body: { note },
    });
  }

  async deleteNote(noteId: string): Promise<void | ErrorResponse> {
    return this.httpClient.fetch(`/${noteId}`, {
      method: 'DELETE',
    });
  }
}

const USER_NOTES_BASE_URL = `${config.server.url}/user/notes`;
const httpClient = new HttpClient(USER_NOTES_BASE_URL);
export const userNotesRepository = new UserNotesRepository(httpClient);

export default UserNotesRepository;
