import { z } from 'zod';

export const parsableToNumberSchema = z.string().refine((value) => {
  const parsed = Number(value);
  return !isNaN(parsed) && isFinite(parsed);
}, {
  message: 'String is not parsable into a number',
});