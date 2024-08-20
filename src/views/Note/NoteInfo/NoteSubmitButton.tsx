import { useFormStatus } from 'react-dom';

import { ContainedButton } from '@/components/Button';

function NoteSubmitButton() {
  const { pending } = useFormStatus();
  const text = pending ? 'Saving...' : 'Add';
  return (
    <ContainedButton disabled={pending} type='submit'>
      {text}
    </ContainedButton>
  );
}

export default NoteSubmitButton;
