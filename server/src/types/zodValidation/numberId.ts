import { z } from "zod";

export const numberIdSchema = z.number().min(1)