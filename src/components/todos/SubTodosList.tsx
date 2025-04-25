'use client'

import { FC } from 'react'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import TodoItem from './TodoItem'
import { ReactMutation, useMutation } from 'convex/react'
import { FunctionReference } from 'convex/server'
import { api } from '../../../convex/_generated/api'
import { toast } from 'sonner'

interface SubTodosListProps {
  subTodosData: Doc<"subtodos">[]
  handleCheck?: ReactMutation<FunctionReference<"mutation", "public", {
    taskId: Id<"subtodos">;
  }, null, string | undefined>>
}

// * create new subtodoItem component and make them popOver
const SubTodosList: FC<SubTodosListProps> = ({ subTodosData }) => {
  const checkSubTodo = useMutation(api.subTodos.checkASubTodo)
  const unCheckSubTodo = useMutation(api.subTodos.unCheckASubTodo)
  const deleteSubTask = useMutation(api.subTodos.deleteSubTask)

  const handleOnChangeSubTodo = (task: Doc<'subtodos'>) => {
    if (task.isCompleted) {
      unCheckSubTodo({ taskId: task._id })
    } else {
      checkSubTodo({ taskId: task._id })
      toast("✅ Subtask completed", {
        description: 'Congratulation! You completed a subtask.',
      })
    }
  }

  const handleSubDelete = (subTask: Doc<'subtodos'>) => {
    deleteSubTask({ subTaskId: subTask._id })
    toast("🗑️ Subtask deleted", {
      description: 'You deleted a subtask.',
    })
  }

  return (
    <ul className='list-disc! subtask-wrapper'>
      {subTodosData.map((task) => (
        <TodoItem
          key={task._id}
          todosData={task}
          // isCompleted={task.isCompleted}
          {...task}
          handleOnChange={() => handleOnChangeSubTodo(task)}
          handleDelete={() => handleSubDelete(task)}
        />
      ))}
    </ul>
  )
}

export default SubTodosList