'use client'

import { useQuery } from 'convex/react'
import moment from 'moment'
import { FC } from 'react'
import { api } from '../../../convex/_generated/api'
import { Todos } from '@/components'
import { Dot } from 'lucide-react'
import TotalTodos from '../components/totalTodos'

interface todosByDateProps {
  date: string
}

const TodosByDate: FC<todosByDateProps> = ({ date }) => {
  const incompleteTodos = useQuery(api.todos.getInCompletedTodos) ?? []
  const filteredTodosByDate = incompleteTodos?.filter(todo => {
    const { dueDate } = todo;
    const _dueDate = new Date(dueDate)
    const resetDueDateHours = moment(_dueDate).startOf("day").valueOf()

    return resetDueDateHours.toString() === date
  })
  const totalTodos = filteredTodosByDate.length
  const formattedDate = new Date(parseInt(date))

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl">
        <div className='font-bold flex items-center gap-0.5'>
          {moment(formattedDate).format("DD MMM")}
          <Dot />
          {moment(formattedDate).format("dddd")}
        </div>
      </h1>
      {/* <div className='text-gray-400 text-sm flex items-center gap-1.5 my-4'>
        <CircleCheck width={15} height={15} />
        <p>{`${totalTodos} tasks`}</p>
      </div> */}
      <TotalTodos
        title='tasks'
        textColor='text-gray-400'
        iconColor='#99a1af'
        totalTodos={totalTodos}
      />
      <Todos items={filteredTodosByDate} />
    </>
  )
}

export default TodosByDate