'use client'

import { useQuery } from 'convex/react'
import { Dot } from 'lucide-react'
import { api } from '../../../convex/_generated/api'
import { Loader, Todos } from '@/components'
import moment from 'moment'
import CustomCollapsible from '../../components/customCollapsible/CustomCollapsible'
import Link from 'next/link'
import TotalTodos from '../components/totalTodos'
import { Doc } from '../../../convex/_generated/dataModel'

// type Todo = {
//   // ... other properties
//   dueDate: string | number; // Accept both string and number
// };

const UpcomingTodos = () => {
  const inCompleteTodos = useQuery(api.todos.getInCompletedTodos) ?? []
  const todayStart = moment().startOf("day")
  const overdueTodos = inCompleteTodos?.filter(todo => todo.dueDate < todayStart.valueOf()) || []
  const upcomingTodos = inCompleteTodos?.filter(todo => todo.dueDate >= todayStart.valueOf()) || []
  const sortedUpcomingTodos = upcomingTodos.sort((a, b) => a.dueDate - b.dueDate)
  const totalIncompleteTodos = useQuery(api.todos.getTotalInCompleteTodos) ?? 0
  // const groupedTodosByDate = sortedUpcomingTodos.reduce((acc, todo) => {
  //   const { dueDate } = todo;
  //   const _dueDate = new Date(dueDate)
  //   const resetDueDateHours = moment(_dueDate).startOf("day")

  //   // * If the dueDate key doesn't exist in the accumulator, create it as an empty array
  //   if (!acc[resetDueDateHours]) {
  //     acc[resetDueDateHours] = [];
  //   }

  //   // * Push the todo item into the respective dueDate group
  //   acc[resetDueDateHours].push(todo);
  //   // * acc[resetDueDateHours] = (acc[resetDueDateHours] || []).concat(todo)
  //   return acc;
  // }, {}) ?? []

  const groupedTodosByDate = sortedUpcomingTodos.reduce<Record<string, Doc<"todos">[]>>((acc, todo) => {
    if (!todo.dueDate) return acc;  // handle cases where dueDate might be missing

    // Use moment directly on the dueDate string if it's in ISO format
    // const dateKey = moment(todo.dueDate).startOf('day').toISOString();

    const dateKey = typeof todo.dueDate === 'number'
      ? moment(new Date(todo.dueDate)).startOf('day').toISOString()
      : moment(todo.dueDate).startOf('day').toISOString();

    // Initialize the array if it doesn't exist
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(todo);
    return acc;
  }, {}) || {};  // Default to empty object instead of array for consistency

  // const groupedTodosByDate = sortedUpcomingTodos.reduce<Record<string, Todo[]>>((acc, todo) => {
  //   if (!todo.dueDate) return acc;

  //   const dateKey = moment(todo.dueDate).startOf('day').toISOString();
  //   acc[dateKey] = acc[dateKey] || [];
  //   acc[dateKey].push(todo);
  //   return acc;
  // }, {});


  if (overdueTodos === undefined || inCompleteTodos === undefined || totalIncompleteTodos === undefined) {
    <Loader />
  }

  return (
    <>
      <TotalTodos
        title='tasks'
        textColor='text-gray-400'
        iconColor='#99a1af'
        totalTodos={totalIncompleteTodos}
      />
      {/* <div className=''> */}
      <CustomCollapsible title='Overdue'>
        <Todos items={overdueTodos} />
      </CustomCollapsible>
      {/* </div> */}
      <div className=''>
        {Object.keys(groupedTodosByDate || {}).map(dueDate => {
          const formattedDate = new Date(dueDate)
          return (
            <div key={formattedDate.valueOf()} className='mb-6'>
              <Link href={`/dashboard/upcoming/${formattedDate.valueOf()}`}>
                <div className='font-bold flex items-center gap-0.5 text-sm'>
                  {moment(formattedDate).format("DD MMM")}
                  <Dot />
                  {moment(formattedDate).format("dddd")}

                </div>
              </Link>
              <ul>
                <Todos items={groupedTodosByDate[dueDate]} />
              </ul>
            </div>)
        })}
      </div>
      {/* <AddTaskWrapper /> */}

    </>
  )
}

export default UpcomingTodos