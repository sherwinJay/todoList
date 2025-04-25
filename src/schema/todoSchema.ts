import { z } from "zod"

export const todoFormSchema = z.object({
  taskName: z.string().min(5, {
    message: "Taskname must be at least 5 characters.",
  }),
  description: z.string().optional().default(""),
  priority: z.string().min(1, { message: "Please select a priority" }),
  dueDate: z.date({ required_error: "A due date is required" }) || z.number(),
  projectId: z.string().min(1, { message: "Please select a project" }),
  labelId: z.string().min(1, { message: "Please select a label" }),
})

export type TodoFormSchema = z.infer<typeof todoFormSchema>

export const projectFormSchema = z.object({
  name: z.string().min(5, {
    message: "project name must be at least 5 characters.",
  }),
})

export type ProjectFormSchema = z.infer<typeof projectFormSchema>
