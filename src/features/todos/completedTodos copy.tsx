'use client'

import { FC, useState } from 'react'
import { useAction, useMutation, useQuery } from 'convex/react'
import { AddTaskWrapper, CustomDialog, CustomDropdownDelete, SubTodosList, TodoItem } from '@/components'
import { api } from '../../../convex/_generated/api'
import { Todos } from '@/components'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { CircleCheck, CircleCheckBig } from 'lucide-react'
import CustomCollapsible from '../../components/customCollapsible/CustomCollapsible'
import TotalTodos from '../components/totalTodos'
import { toast } from 'sonner'
import { Separator } from '@radix-ui/react-dropdown-menu'

const CompletedTodos = ({ }) => {
  const completedTodos = useQuery(api.todos.getCompletedTodos) ?? []
  // const completedSubTodos = useQuery(api.subTodos.completedSubTodos) ?? []
  // const unCheckSubTodoMutation = useMutation(api.subTodos.unCheckASubTodo)
  // const totalCompletedTasks = completedTodos.length + completedSubTodos.length

  // const deleteAllTasks = useMutation(api.todos.deleteAllCompletedTodos)
  const deleteAllTasksAndItsSubtasks = useAction(api.todos.deleteAllCompletedTodoAndItsSubtasks)

  // const completedTodosIds = completedTodos.map(todo => todo._id)
  const deleteSubTask = useMutation(api.subTodos.deleteSubTask)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)


  const handleSubDelete = (subTask: Doc<'subtodos'>) => {
    deleteSubTask({ subTaskId: subTask._id })
    toast("Sub Task deleted", {
      description: 'You deleted a task.',
    })
  }

  // const handleClearAllCompleteTasks = () => {
  //   deleteAllTasks()
  //   toast("🗑️ Task deleted", {
  //     description: 'You deleted a task.',
  //   })
  // }

  const handleClearAllCompleteTasks = () => {
    deleteAllTasksAndItsSubtasks()
    setShowConfirmDelete(false)
    toast("🗑️ Task deleted", {
      description: 'You deleted all task.',
    })
  }

  if (completedTodos === undefined || completedSubTodos === undefined) {
    <p>Loading...</p> // * replace this later
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
          {completedTodos.length > 0 ? (<Todos items={completedTodos} />) : (
            <div className='grid place-content-center py-15'>
              <p>No completed tasks</p>
            </div>
          )}
        </CustomCollapsible>
        <div className='absolute top-4 right-0'>
          <CustomDropdownDelete title='Clear Main Tasks' handleConfirmDelete={() => setShowConfirmDelete(true)} disabled={completedTodos.length === 0} />
        </div>
      </div>

      {/* Sub Task */}
      {/* <div className='relative'>
        <CustomCollapsible title='Sub Tasks'>
          <ul className='list-disc!'>
            {completedSubTodos?.map((task: Doc<"subtodos">) => (
              <TodoItem
                todosData={task}
                key={task._id}
                handleOnChange={() => unCheckSubTodoMutation({ taskId: task._id })}
                handleDelete={() => handleSubDelete(task)}
              />
            ))}
          </ul>
        </CustomCollapsible>
        <div className='absolute top-4 right-0'>
          <CustomDropdownDelete
            title='Clear Sub Tasks'
            handleDelete={() => { }}
            disabled={completedSubTodos.length === 0}
          />
        </div>
      </div> */}
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