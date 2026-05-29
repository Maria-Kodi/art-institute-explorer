import { z } from "zod";

export const NoteSchema = z.string().max(200);

export type Note = z.infer<typeof NoteSchema>;