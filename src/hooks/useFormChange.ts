import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const useFormChange = <T>(setForm: Dispatch<SetStateAction<T>>) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return handleChange;
};
