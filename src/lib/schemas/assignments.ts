import { z } from "zod";

export const assignmentSchema = z.object({
  title: z.string().min(3, "Title is required"),
  instructions: z.string().optional(),
  link: z.string().url().optional(),
  fileUrl: z.string().url().optional(),
});

export type Assignment = z.infer<typeof assignmentSchema>;
