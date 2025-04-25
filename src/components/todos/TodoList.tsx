'use client'

import { FC } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { CircleCheckBig } from 'lucide-react'
import Todos from './Todos'
import { AddTaskWrapper } from '@/components'
import TotalTodos from '@/features/components/totalTodos'

const TodoList = ({ }) => {
  // const todos = useQuery(api.todos.get) ?? []
  // const completedTodos = useQuery(api.todos.getCompletedTodos) ?? []
  const inCompleteTodos = useQuery(api.todos.getInCompletedTodos) ?? []
  // const totalCompletedTodos = useQuery(api.todos.getTotalCompletedTodos) ?? 0

  if (inCompleteTodos === undefined) {
    <p>Loading...</p> // * replace this later
  }

  return (
    <div className="p-4 xl:px-40 bg-muted/50 aspect-video rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>
      <TotalTodos
        title='tasks'
        textColor='text-gray-400'
        iconColor='#99a1af'
        totalTodos={inCompleteTodos.length}
      />
      {
        // **incomplete todos
      }
      <div className="flex flex-col gap-1">
        <Todos
          items={inCompleteTodos}
        />
      </div>
      {
        // **complete todos
      }
      {/* <AddTaskWrapper /> */}

      {/* <div className="flex flex-col gap-1">
        <Todos
          items={completedTodos}
        />
      </div>

      <div className='flex items-center gap-1 border-b-1 py-4 border-gray-200 dark:border-foreground/10 text-sm text-card-foreground/80'>
        <CircleCheckBig color="#f39c16" />
        <span>+{totalCompletedTodos}</span>
        <span className='capitalize'>completed tasks</span>
      </div> */}

    </div>
  )
}

export default TodoList