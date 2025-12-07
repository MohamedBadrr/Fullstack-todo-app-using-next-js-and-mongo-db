import { z } from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  body: z
    .string()
    .max(160, {
      message: "Content of todo must be at least 160 characters.",
    })
    .min(4, {
      message: "Content of todo must be at least 4 characters.",
    })
    .optional(),
  completed: z.boolean().optional(),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

// This can come from your database or API. 