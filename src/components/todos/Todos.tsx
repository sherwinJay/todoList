'use client'

import { FC } from 'react'
import { useAction, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Doc } from '../../../convex/_generated/dataModel'
import TodoItem from './TodoItem'
import { toast } from 'sonner'

interface TodosProps {
  items: Doc<'todos'>[]
}

const Todos: FC<TodosProps> = ({ items }) => {

  const checkATodo = useMutation(api.todos.checkATodo)
  const unCheckATodo = useMutation(api.todos.unCheckATodo)
  const deleteTaskAndItsSubtasks = useAction(api.todos.deleleTaskAndItsSubtasks)

  const handleOnChangeTodo = (task: Doc<'todos'>) => {
    if (task.isCompleted) {
      unCheckATodo({ taskId: task._id })
    } else {
      checkATodo({ taskId: task._id })
      toast("🎉 Task completed", {
        description: 'Congratulations! You completed a task.',
      })
    }
  }

  const handleDelete = (task: Doc<'todos'>) => {
    deleteTaskAndItsSubtasks({ taskId: task._id })
    toast("🗑️ Task deleted", {
      description: 'You deleted a task.',
    })
  }

  // TODO : add dialog box here

  return (
    <ul className='list-disc!'>
      {items?.map((todo: Doc<"todos">) => (
        <TodoItem
          // {...todo} // spread the props
          todosData={todo}
          key={todo._id}
          handleOnChange={() => handleOnChangeTodo(todo)}
          handleDelete={() => handleDelete(todo)}
        />
      ))}
    </ul>
  )
}

export default Todos