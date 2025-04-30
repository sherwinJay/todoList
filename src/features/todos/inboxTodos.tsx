'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import TotalTodos from '../components/totalTodos'
import { Loader, Todos } from '@/components'
import Image from 'next/image'

const InboxTodos = ({ }) => {
  const inCompleteTodos = useQuery(api.todos.getInCompletedTodos) ?? []
  const totalIncompleteTodos = useQuery(api.todos.getTotalInCompleteTodos)

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
      <div className="flex flex-col gap-1">
        <Todos
          items={inCompleteTodos}
        />
      </div>

      {totalIncompleteTodos === 0 && (
        <div className='flex gap-3 items-center flex-col mt-20'>
          <Image
            src='../assets/images/undraw_tree-swing_5010.svg'
            alt="woman reading on a tree with swing"
            width={250}
            height={250}
          />
          <div className='text-center flex flex-col items-center mt-4'>
            <h3 className='font-semibold text-md'>Your peace of mind is priceless</h3>
            <p className='text-sm mt-2 w-[250px] leading-6'>
              Well done! All your tasks are organized in the right place.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default InboxTodos