import { NoteContent } from '@/features/notes';
import UserNotesRepository, {
  userNotesRepository,
} from '@/repository/userNotes/repository';
import { AddNewNoteRes, EditNoteRes } from '@/repository/userNotes/type';

import { Result, ResultWithData } from '../type';

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

  async editNote(
    noteId: string,
    note: Partial<NoteContent>,
  ): Promise<ResultWithData<EditNoteRes>> {
    try {
      const result = await this.repo.editNote(noteId, note);
      if ('updatedAt' in result) return { success: true, data: result };

      throw new Error(
        result?.data?.message || 'Server error while updating note',
      );
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Could not update note item.',
      };
    }
  }
}

const userNotesService = new UserNotesService(userNotesRepository);
export default userNotesService;
