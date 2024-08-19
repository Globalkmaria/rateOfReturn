import { config } from '@/config';
import { NoteContent } from '@/features/notes';
import HttpClient from '@/network/http';
import { ErrorResponse } from 'react-router-dom';
import { AddNewNoteRes } from './type';

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
}

const USER_NOTES_BASE_URL = `${config.server.url}/user/notes`;
const httpClient = new HttpClient(USER_NOTES_BASE_URL);
export const userNotesRepository = new UserNotesRepository(httpClient);

export default UserNotesRepository;
