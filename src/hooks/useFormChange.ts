import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';

export const useFormChange = <T>(setForm: Dispatch<SetStateAction<T>>) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [setForm],
  );

  return handleChange;
};
