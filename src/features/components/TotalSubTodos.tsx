'use client'

import { useQuery } from 'convex/react'
import { FC } from 'react'
import { api } from '../../../convex/_generated/api'
import { CircleCheckBig } from 'lucide-react'

interface TotalSubTodosProps {
  id: string
  isDialog: boolean
}

const TotalSubTodos: FC<TotalSubTodosProps> = ({ id, isDialog }) => {
  const incompleteSubTodosByProject = useQuery(api.subTodos.inCompleteSubTodos) ?? []
  const completedSubTodosByProject = useQuery(api.subTodos.completedSubTodos) ?? []
  const inCompleteSubTodo = incompleteSubTodosByProject.filter(item => item.parentId === id)
  const completedSubTodosByTask = completedSubTodosByProject.filter(item => item.parentId === id).length
  const totalSubtodosByTasks = inCompleteSubTodo.length + completedSubTodosByTask
  return (
    <>
      {totalSubtodosByTasks > 0 && (
        <div className='text-xs flex gap-1 items-center'>
          {isDialog ? (
            <CircleCheckBig width={14} height={14} />
          ) : (
            <span className='dark:text-gray-300'>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" aria-label="1/1 sub-task"><path fill="currentColor" d="M4.5 2A2.5 2.5 0 0 1 5 6.95V8.5a2.5 2.5 0 0 0 2.336 2.495L7.5 11h1.55a2.5 2.5 0 1 1 0 1H7.5a3.5 3.5 0 0 1-3.495-3.308L4 8.5V6.95A2.5 2.5 0 0 1 4.5 2zm7 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-7-7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path></svg>
            </span>
          )}
          <p className='text-gray-400'>{`${completedSubTodosByTask}/${totalSubtodosByTasks}`}</p>
        </div>
      )}
      {totalSubtodosByTasks === 0 && <div hidden />}
    </>
  )
}

export default TotalSubTodos