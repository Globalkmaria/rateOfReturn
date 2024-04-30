import { z } from 'zod';

export const getDecimalPlacesSchema = (places: number) =>
  z.number().refine(
    n => {
      return (n.toString().split('.')[1] || '').length <= places;
    },
    { message: `Max precision is ${places} decimal places` },
  );
