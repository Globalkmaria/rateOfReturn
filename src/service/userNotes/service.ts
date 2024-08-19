import { NoteContent } from '@/features/notes';
import UserNotesRepository, {
  userNotesRepository,
} from '@/repository/userNotes/repository';
import { AddNewNoteRes } from '@/repository/userNotes/type';

import { ResultWithData } from '../type';

class UserNotesService {
  repo: UserNotesRepository;
  constructor(repo: UserNotesRepository) {
    this.repo = repo;
  }

  async addNewNote(note: NoteContent): Promise<ResultWithData<AddNewNoteRes>> {
    try {
      const result = await this.repo.addNewNote(note);
      if ('id' in result) {
        return {
          data: result,
          success: true,
        };
      }

      if (result?.status === 400) {
        return { success: false, message: 'Please check the input data.' };
      }

      throw new Error('Error accrued while adding new note in server.');
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Could not add new note item.',
      };
    }
  }
}

const userNotesService = new UserNotesService(userNotesRepository);
export default userNotesService;
