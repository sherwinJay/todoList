'use client'

import { useState } from 'react'
import { useAction, useQuery } from 'convex/react'
import { CustomDialog, CustomDropdownDelete, Loader } from '@/components'
import { api } from '../../../convex/_generated/api'
import { Todos } from '@/components'
import CustomCollapsible from '../../components/customCollapsible/CustomCollapsible'
import TotalTodos from '../components/totalTodos'
import { toast } from 'sonner'
import Image from 'next/image'

const CompletedTodos = ({ }) => {
  const completedTodos = useQuery(api.todos.getCompletedTodos) ?? []
  const totalCompletedTasks = useQuery(api.todos.getTotalCompletedTodos)
  const deleteAllTasksAndItsSubtasks = useAction(api.todos.deleteAllCompletedTodoAndItsSubtasks)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const handleClearAllCompleteTasks = () => {
    deleteAllTasksAndItsSubtasks()
    setShowConfirmDelete(false)
    toast("🗑️ Task deleted", {
      description: 'You deleted all task.',
    })
  }

  if (completedTodos === undefined || totalCompletedTasks === undefined) {
    return <Loader />
  }

  return (
    <>
      <TotalTodos
        title='tasks'
        textColor='text-green-600 dark:text-green-500'
        iconColor='#00c951'
        totalTodos={completedTodos.length}
      />

      {/* Main Task */}


      {totalCompletedTasks > 0 ? (
        <div className='relative'>
          <CustomCollapsible title='Main Tasks'>
            <Todos items={completedTodos} />
          </CustomCollapsible>
          <div className='absolute top-4 right-0'>
            <CustomDropdownDelete title='Clear Main Tasks' handleConfirmDelete={() => setShowConfirmDelete(true)} disabled={completedTodos.length === 0} />
          </div>
        </div>
      ) : (
        <div className='flex gap-3 items-center flex-col mt-20'>
          <Image
            src="../assets/images/undraw_accept-tasks_syrr.svg"
            alt="man standing near the post"
            width={300}
            height={300}
          />
          <div className='text-center flex flex-col items-center mt-4'>
            <h3 className='font-semibold text-md'>You cleared all your tasks</h3>
            <p className='text-sm mt-2 w-[250px] leading-6'>
              See all changes that have been made in your account.
            </p>
          </div>
        </div>
      )}



      {showConfirmDelete && (
        <CustomDialog
          title="Delete All Tasks"
          taskName="All tasks"
          setShowConfirmDelete={() => setShowConfirmDelete(false)}
          handleDelete={() => handleClearAllCompleteTasks()}
        />
      )}
    </>
  )
}

export default CompletedTodos