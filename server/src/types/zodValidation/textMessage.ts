import { z } from "zod";
export const textMessageSchema = z.string().nonempty()