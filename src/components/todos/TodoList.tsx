'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import Todos from './Todos'
import TotalTodos from '@/features/components/totalTodos'

const TodoList = ({ }) => {
  const inCompleteTodos = useQuery(api.todos.getInCompletedTodos) ?? []

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

    </div>
  )
}

export default TodoList