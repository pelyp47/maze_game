import { z } from "zod";

export const commandIdSchema = z.number().min(1).max(4)