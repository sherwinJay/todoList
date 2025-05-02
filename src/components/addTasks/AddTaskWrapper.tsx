'use client'

import { FC, useState } from 'react'
import { AddTaskButton, AddForm } from '@/components'
import { AddTaskWrapperProps } from '@/types/types'


const AddTaskWrapper: FC<AddTaskWrapperProps> = ({ parentTask }) => {
  // ! try to improve the logic of this component
  //  ! - try to add project id hre, make it optional

  const [addForm, setAddForm] = useState(false)
  // const { _id, isCompleted } = parentTask

  return (
    <div className='py-4'>
      {addForm ? (
        <AddForm hideModal={() => setAddForm(false)} parentTask={parentTask} />
      ) : (
        <AddTaskButton showModal={() => setAddForm(true)} isCompleted={parentTask?.isCompleted} title={parentTask?._id ? 'Add Subtask' : 'Add task'} />
      )}
    </div>

  )
}

export default AddTaskWrapper