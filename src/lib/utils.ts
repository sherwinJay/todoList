import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Doc } from "../../convex/_generated/dataModel"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkIsSubTodo(
  data: Doc<"todos"> | Doc<"subtodos">
): data is Doc<"subtodos"> {
  return "parentId" in data
}
