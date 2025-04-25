'use client'

import { useState } from 'react'
import { useAction, useQuery } from 'convex/react'
import { CustomDialog, CustomDropdownDelete, Loader } from '@/components'
import { api } from '../../../convex/_generated/api'
import { Todos } from '@/components'
import CustomCollapsible from '../../components/customCollapsible/CustomCollapsible'
import TotalTodos from '../components/totalTodos'
import { toast } from 'sonner'

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
      <div className='relative'>
        <CustomCollapsible title='Main Tasks'>
          {totalCompletedTasks > 0 ? (<Todos items={completedTodos} />) : (
            <div className='grid place-content-center py-15'>
              <p>No completed tasks</p>
            </div>
          )}
        </CustomCollapsible>
        <div className='absolute top-4 right-0'>
          <CustomDropdownDelete title='Clear Main Tasks' handleConfirmDelete={() => setShowConfirmDelete(true)} disabled={completedTodos.length === 0} />
        </div>
      </div>

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