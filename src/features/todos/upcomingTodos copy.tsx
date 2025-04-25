'use client'

import { FC } from 'react'
import { useQuery } from 'convex/react'
import { CircleCheck, CircleCheckBig, Dot } from 'lucide-react'
import { AddTaskWrapper } from '@/components'
import { api } from '../../../convex/_generated/api'
import { Todos } from '@/components'
import moment from 'moment'

interface TodayTodosProps {

}

const UpcomingTodos: FC<TodayTodosProps> = ({ }) => {
  const todos = useQuery(api.todos.get) ?? []
  // const todayTodos = useQuery(api.todos.getTodayTodos) ?? []
  // const overdueTodos = useQuery(api.todos.getOverdueTodos) || []
  const dateToday = moment(new Date()).format("DD MMM")
  const dateNameToday = moment(new Date()).format("dddd")
  const incompleteTodos = useQuery(api.todos.getInCompletedTodos)
  const todayStart = moment().startOf("day")
  const todayEnd = moment().endOf("day")
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcomingTodos = incompleteTodos?.filter(todo => todo.dueDate >= todayStart.valueOf()) || []
  const groupedTodosByDate = upcomingTodos.reduce((acc, todo) => {
    const { dueDate } = todo;
    const _dueDate = new Date(dueDate)
    _dueDate.setHours(0, 0, 0, 0)

    // If the dueDate key doesn't exist in the accumulator, create it as an empty array
    if (!acc[_dueDate]) {
      acc[_dueDate] = [];
    }

    // Push the todo item into the respective dueDate group
    acc[_dueDate].push(todo);
    // acc[_dueDate] = (acc[_dueDate] || []).concat(todo)
    return acc;
  }, {}) ?? []

  console.log(groupedTodosByDate)

  const overdueTodos = incompleteTodos?.filter(todo => todo.dueDate < todayStart.valueOf()) || []
  const todayTodos = incompleteTodos?.filter(todo => todo.dueDate >= todayStart.valueOf() && todo.dueDate <= todayEnd.valueOf()) || []
  const totalTodos = todayTodos.length + overdueTodos.length

  if (todos === undefined || todayTodos === undefined || overdueTodos === undefined || incompleteTodos === undefined || upcomingTodos) {
    <p>Loading...</p> // * replace this later
  }

  return (
    <div className="p-4 xl:px-40 bg-muted/50 aspect-video rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Today</h1>
      </div>
      {/* <div className='text-gray-400 text-sm flex items-center gap-1.5 mt-4'>
        <CircleCheck width={15} height={15} />
        <p>{`${totalTodos} tasks`}</p>
      </div> */}
      <div className="flex flex-col gap-1 py-4">
        <div className='flex items-center gap-0.5'>
          <h1 className='text-sm font-bold'>Overdue</h1>
        </div>
        <Todos items={overdueTodos} />
      </div>
      {
        // **incomplete todos
      }
      {/* <div className="flex flex-col gap-1 py-4">
        <div className='font-bold flex items-center gap-1 text-sm'>
          <h1>{dateToday}</h1>
          <Dot />
          Today
          <Dot />
          <h1>{dateNameToday}</h1>
        </div>

        <Todos items={todayTodos} />
      </div> */}
      <div>
        {Object.keys(groupedTodosByDate || {}).sort((a, b) => parseInt(a) - parseInt(b)).map(dueDate => {
          const formattedDate = new Date(dueDate)
          console.log("due date: ", formattedDate)
          return (
            <div key={dueDate} className='mb-6'>
              <div className='font-bold flex items-center gap-1 text-sm'>
                {moment(formattedDate).format("DD MMM")}
                <Dot />
                {moment(formattedDate).format("dddd")}

              </div>
              <ul>
                <Todos items={groupedTodosByDate[dueDate]} />
              </ul>
            </div>)
        })}
      </div>
      <AddTaskWrapper />

    </div>
  )
}

export default UpcomingTodos