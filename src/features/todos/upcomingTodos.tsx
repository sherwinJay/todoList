'use client'

import { useQuery } from 'convex/react'
import { Dot } from 'lucide-react'
import { api } from '../../../convex/_generated/api'
import { AddTaskWrapper, Loader, Todos } from '@/components'
import moment from 'moment'
import CustomCollapsible from '../../components/customCollapsible/CustomCollapsible'
import Link from 'next/link'
import TotalTodos from '../components/totalTodos'
import { Doc } from '../../../convex/_generated/dataModel'
import Image from 'next/image'

const UpcomingTodos = () => {
  const inCompleteTodos = useQuery(api.todos.getInCompletedTodos)
  const todayStart = moment().startOf("day")
  const overdueTodos = inCompleteTodos?.filter(todo => todo.dueDate < todayStart.valueOf()) || []
  const upcomingTodos = inCompleteTodos?.filter(todo => todo.dueDate >= todayStart.valueOf()) || []
  const sortedUpcomingTodos = upcomingTodos.sort((a, b) => a.dueDate - b.dueDate)
  const totalIncompleteTodos = useQuery(api.todos.getTotalInCompleteTodos)

  const groupedTodosByDate = sortedUpcomingTodos.reduce<Record<string, Doc<"todos">[]>>((acc, todo) => {
    if (!todo.dueDate) return acc;  // handle cases where dueDate might be missing

    // Use moment directly on the dueDate string if it's in ISO format
    const dateKey = typeof todo.dueDate === 'number'
      ? moment(new Date(todo.dueDate)).startOf('day').toISOString()
      : moment(todo.dueDate).startOf('day').toISOString();

    // * Initialize the array if it doesn't exist
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    // * Push the todo item into the respective dueDate group
    acc[dateKey].push(todo);
    return acc;
  }, {}) || {};  // Default to empty object instead of array for consistency

  if (inCompleteTodos === undefined || totalIncompleteTodos === undefined) {
    return <Loader />
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

      {totalIncompleteTodos === 0 && (
        <>
          <AddTaskWrapper />
          <div className='flex gap-3 items-center flex-col mt-20'>
            <Image
              src='../assets/images/undraw_online-calendar_zaoc.svg'
              alt="woman reading on a tree with swing"
              width={250}
              height={250}
            />
            <div className='text-center flex flex-col items-center mt-4'>
              <h3 className='font-semibold text-md'>No tasks in the upcoming days</h3>
              <p className='text-sm mt-2 w-[250px] leading-6'>
                All your upcoming tasks will be displayed here.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UpcomingTodos