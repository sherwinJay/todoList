'use client'

import { useQuery } from 'convex/react'
import { Dot } from 'lucide-react'
import { AddTaskWrapper, CustomCollapsible, Loader, TotalTodos } from '@/components'
import { api } from '../../../convex/_generated/api'
import { Todos } from '@/components'
import moment from 'moment'
import Image from 'next/image'

const TodayTodos = ({ }) => {
  const incompleteTodos = useQuery(api.todos.getInCompletedTodos)
  const dateToday = moment(new Date()).format("DD MMM")
  const dateNameToday = moment(new Date()).format("dddd")
  const todayStart = moment().startOf("day")
  const todayEnd = moment().endOf("day")
  const overdueTodos = incompleteTodos?.filter(todo => todo.dueDate < todayStart.valueOf()) || []
  const todayTodos = incompleteTodos?.filter(todo => todo.dueDate >= todayStart.valueOf() && todo.dueDate <= todayEnd.valueOf()) || []
  const totalTodos = todayTodos.length + overdueTodos.length

  if (incompleteTodos === undefined) {
    return <Loader />
  }

  return (
    <>
      <TotalTodos
        title='tasks'
        textColor='text-gray-400'
        iconColor='#99a1af'
        totalTodos={totalTodos}
      />

      <CustomCollapsible title='Overdue'>
        <Todos items={overdueTodos} />
      </CustomCollapsible>

      <div className="flex flex-col gap-1 py-4">
        <div className='font-bold flex items-center gap-0.5 text-sm'>
          <h1>{dateToday}</h1>
          <Dot />
          Today
          <Dot />
          <h1>{dateNameToday}</h1>
        </div>

        {todayTodos.length > 0 ? (
          <Todos items={todayTodos} />
        ) : (
          <AddTaskWrapper />
        )}

        {totalTodos === 0 && (
          <div className='flex gap-3 items-center flex-col mt-20'>
            <Image
              src="../assets/images/undraw_designer_efwz.svg"
              alt="designer working"
              width={300}
              height={300}
            />
            <div className='text-center flex flex-col items-center mt-4'>
              <h3 className='font-semibold text-md'>What do you need to get done today?</h3>
              <p className='text-sm mt-2 w-[250px] leading-6'>
                By default, tasks added here will be scheduled for today.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default TodayTodos