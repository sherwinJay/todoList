import { ReactMutation } from "convex/react"
import { Doc, Id } from "../../convex/_generated/dataModel"
import { FunctionReference } from "convex/server"

export type UpcomingPageTypes = Promise<{ date: string }>

export type AddSubTaskDialogProps = {
  subTodosData: Doc<"subtodos">
}

export type AddTaskButtonProps = {
  showModal: () => void
  title: string
  isCompleted?: boolean
}

export type AddTaskDialogProps = {
  todosData: Doc<"todos">
  handleOnChange: () => void
}

export type DetailsType = {
  labelName: string
  value: string
  icon: React.ReactNode
  id: number
}

export type AddTaskWrapperProps = {
  parentTask?: Doc<"todos">
}

export type CustomCheckboxProps = {
  priority: number | undefined
  isCompleted: boolean
  handleOnChange: () => void
  styles: string
}

export type CustomCollapsibleProps = {
  title: string
  children: React.ReactNode
  showDropdownDelete?: boolean
}

export type customDialogProps = {
  taskName?: string
  setShowConfirmDelete: () => void
  handleDelete: () => void
  title: string
}

export type CustomDropdownProps = {
  handleConfirmDelete: () => void
  title: string
  disabled?: boolean
  showEdit?: boolean
  showProjectForm?: () => void
}

export type CustomEditorProps = {
  testData: string
  onChange?: (value: React.ReactNode) => void
}

export type AddFormType = {
  hideModal: () => void
  parentTask?: Doc<"todos">
}

export type ProjectFormProps = {
  hideModal: () => void
}

export type UpdateTaskFormProps = {
  parentTask: Doc<"todos"> | Doc<"subtodos">
  hideModal: () => void
}

export type SubTodosListProps = {
  subTodosData: Doc<"subtodos">[]
  handleCheck?: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        taskId: Id<"subtodos">
      },
      null,
      string | undefined
    >
  >
}

export type TodoItemProps = {
  todosData: Doc<"todos"> | Doc<"subtodos">
  handleOnChange: () => void
  handleDelete: () => void
}

export type TodosProps = {
  items: Doc<"todos">[]
}

export type TotalSubTodosProps = {
  id: string
  isDialog: boolean
}

export type totalTodosProps = {
  title: string
  textColor: string
  iconColor?: string
  totalTodos: number
}

export type todosByDateProps = {
  date: string
}

export type projectTitleFormProps = {
  name: string
  hideModal: () => void
  projectId: Id<"projects">
}
